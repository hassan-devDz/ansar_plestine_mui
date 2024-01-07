import { NextResponse } from "next/server";

import { contactFormSchema } from "@/validation/ValidationSchema";
import { sendMailer } from "@/lib/sendMail";
async function validateFormData(data) {
  try {
    // التحقق من البيانات باستخدام Yup
    const valid = await contactFormSchema

      .camelCase()
      .validate(data, { abortEarly: false, stripUnknown: true });
    
    // إذا تم التحقق بنجاح، تابع التنفيذ
    return {
      success: true,
    };
  } catch (error) {
    // إرسال رسالة الخطأ إذا فشل التحقق
    console.log(error.value);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 400 }
    );
  }
}
async function validateFormData1(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const valid = await contactFormSchema
        .camelCase()
        .validate(data, { abortEarly: false, stripUnknown: true });

      resolve({
        success: true,
      });
    } catch (error) {
      console.log(error.value);
      reject({
        success: false,
        error: error.message,
        status: 400,
      });
    }
  });
}

async function verifyCaptcha(captcha) {
  if (!captcha) {
    return NextResponse.json(
      {
        error: "رمز التفعيل مطلوب",
      },
      { status: 422 }
    );
  }

  try {
    // Ping the hcaptcha verify API to verify the captcha code you received
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: `response=${captcha}&secret=${process.env.RECAPTCHA_SECRET_KEY}`,
        method: "POST",
      }
    );

    const captchaValidation = await response.json();

    if (captchaValidation.success !== true) {
      // Replace this with the API that will save the data received
      // to your backend
       const errorCodes = captchaValidation["error-codes"] || [];
       const errorMessage =
         errorCodes.length > 0
           ? `رمز التفعيل غير صحيح (${errorCodes.join(", ")})`
           : "رمز التفعيل غير صحيح";

       return NextResponse.json(
         {
           error: errorMessage,
         },
         { status: 422 }
       );
      
    } 
     return {
       success: true,
     };
  } catch (error) {
    console.error("Error verifying captcha:", error);
    return NextResponse.json(
      {
        error: "هناك خطأ ما",
      },
      { status: 422 }
    );
  }
}

export async function POST(request, ctx) {
  try {
    // التحقق من نوع محتوى الطلب
    const contentType = request.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        {
          error:
            "Invalid or missing Content-Type header. Expected application/json.",
        },
        { status: 400 }
      );
    }

    // قراءة البيانات من الطلب
    const rawData = await request.text();

    // التحقق من وجود بيانات قبل محاولة تحليلها
    if (!rawData.trim()) {
      return NextResponse.json(
        {
          error: "No valid JSON data provided.",
        },
        { status: 400 }
      );
    }
    // التحقق من صحة تنسيق JSON
    let data;
    try {
      data = JSON.parse(rawData);
    } catch (jsonError) {
      return NextResponse.json(
        {
          error: "Invalid JSON format.",
        },
        { status: 400 }
      );
    }
    const { captcha, ...formData } = await data;
    
    const validationError = await validateFormData(data);
    if (!validationError.success) {
      return validationError;
    }
    const _verifyCaptcha = await verifyCaptcha(captcha);
    if (!_verifyCaptcha.success) {
      return _verifyCaptcha;
    }
    const sendMail = await sendMailer(formData);
    if (!sendMail.success) {
      return NextResponse.json(
        { message: "حدث خطأ في إرسال البريد الإلكتروني:" },
        { status: 400 }
      );
    }

    // إرجاع استجابة بنجاح مع البيانات المستلمة
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    // في حالة حدوث خطأ، يمكنك التعامل معه هنا
    console.error("Error processing the request:", error);

    // إرجاع استجابة خطأ مع رسالة خطأ
    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}


