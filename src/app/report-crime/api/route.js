import { NextResponse, NextRequest } from "next/server";
import path from "path";
import formidable from "formidable";
import { schema } from "@/validation/ValidationSchema";
import { createEdgeRouter, expressWrapper } from "next-connect";

/**
 * تحويل كائن FormData إلى كائن JavaScript مع التعامل مع حالة خاصة للمفتاح "responsibleParties"
 * @param {FormData} form - كائن FormData الذي يجب تحويله إلى كائن JavaScript
 * @returns {Object} - الكائن JavaScript بعد التحويل
 */
function formDataToObject(form) {
  // الكائن النهائي الذي سيتم بناءه
  const obj = {};

  // الدورة عبر مدخلات FormData
  for (const [key, value] of form.entries()) {
    // تحويل المفاتيح إلى مصفوفة لمعالجة المؤشرات
    const keys = key.replace(/\]/g, "").split("[");

    // استخدام reduce لبناء الكائن بناءً على المفاتيح
    keys.reduce((acc, currentKey, index) => {
      if (index === keys.length - 1) {
        // إذا كان المفتاح هو "responsibleParties"
        if (currentKey === "responsibleParties") {
          // تقسيم القيمة إلى مصفوفة عند الفواصل
          acc[currentKey] = value.split(",");
        } else if (acc[currentKey]) {
          // إذا كان هناك قيمة بالفعل، قم بإضافتها إلى مصفوفة إذا لزم الأمر
          if (!Array.isArray(acc[currentKey])) {
            acc[currentKey] = [acc[currentKey]];
          }

          acc[currentKey].push(value);
        } else if (currentKey === "files") {
          // إذا كان هناك قيمة بالفعل، قم بإضافتها إلى مصفوفة إذا لزم الأمر
          if (!Array.isArray(value)) {
            acc[currentKey] = [value];
          }
        } else {
          // إلا، قم بتعيين القيمة
          acc[currentKey] = value;
        }
      } else {
        // إذا لم تكن هذه آخر مؤشر، قم بتكوين الكائن الداخلي
        acc[currentKey] = acc[currentKey] || {};
      }
      return acc[currentKey];
    }, obj);
  }

  return obj;
}

/**
 * Middleware للتحقق من البيانات باستخدام Yup
 * @param {Object} req - كائن الطلب
 * @param {Object} res - كائن الاستجابة
 * @param {Function} next - وظيفة التابع القادمة في سلسلة المتوسطات
 * @returns {Promise} - إذا تم التحقق بنجاح، تابع التنفيذ، وإلا فإنه يرسل رد خطأ
 */
async function validateFormData(req, res, next) {
  try {
    // معالجة multipart/form-data
    const formData = await req.formData();

    // تحويل FormData إلى كائن JavaScript
    const fields = await formDataToObject(formData);
    // التحقق من البيانات باستخدام Yup
    await schema
      .camelCase()
      .validate(fields, { abortEarly: false, stripUnknown: true });

    // إذا تم التحقق بنجاح، تابع التنفيذ
    return next();
  } catch (error) {
    // إرسال رسالة الخطأ إذا فشل التحقق
    console.error(error);
    return NextResponse.json({ error: `${error.message}` }, { status: 400 });
  }
}

const router = createEdgeRouter();

router.use(validateFormData).post(async (req, res) => {
  return NextResponse.json(
    {
      message: "User has been created",
    },
    { status: 201 }
  );
});
router.handler({
  onError(error, req, res) {
    return NextResponse.json(
      { error: `Sorry something Happened! ${error.message}` },
      { status: 501 }
    );
  },
  onNoMatch(req, res) {
    return NextResponse.json(
      { error: `Method '${req.method}' Not Allowed` },
      { status: 405 }
    );
  },
});
export const config = {
  api: {
    bodyParser: false,
  },
};
export const runtime = "nodejs";
export async function POST(request, ctx) {
  return router.run(request, ctx);
}
