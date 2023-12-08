import { NextResponse, NextRequest } from "next/server";
import path from "path";
import formidable from "formidable";
import { createValidationSchema as validationSchema ,schema} from "@/validation/ValidationSchema";
import { createEdgeRouter, expressWrapper } from "next-connect";

function formDataToObject(form) {
  const obj = {};
  for (const [key, value] of form.entries()) {
    const keys = key.replace(/\]/g, "").split("[");

    keys.reduce((acc, currentKey, index) => {
      if (index === keys.length - 1) {
        if (currentKey === "responsibleParties") {
          // تقسيم القيمة إلى مصفوفة عند الفواصل
          acc[currentKey] = value.split(",");
        } else if (acc[currentKey]) {
          if (!Array.isArray(acc[currentKey])) {
            acc[currentKey] = [acc[currentKey]];
          }
          acc[currentKey].push(value);
        } else {
          acc[currentKey] = value;
        }
      } else {
        acc[currentKey] = acc[currentKey] || {};
      }
      return acc[currentKey];
    }, obj);
  }
  return obj;
}

// Middleware للتحقق من البيانات
async function validateFormData(req, res, next) {
  try {
    // معالجة multipart/form-data
     const formData = await req.formData();
     const fields = formDataToObject(formData)
    console.log(fields, "ffffff");
    // التحقق من البيانات باستخدام Yup
    await schema.validate(fields, { abortEarly: false });

    // إذا تم التحقق بنجاح، تابع التنفيذ
    return next();
  } catch (error) {
    // إرسال رسالة الخطأ إذا فشل التحقق
    console.log(error)
    return NextResponse.json(
          { error: `${ error.message}` },
          { status: 400 }
        );
    
  }
}

//

const router = createEdgeRouter();

router
 .use(validateFormData)
  .post(async (req, res) => {
    return NextResponse.json({
      message: "User has been created",
    });
  });
router.handler({
  onError(error, req, res) {
    return NextResponse.json({ error: `Sorry something Happened! ${error.message}` }, { status: 501 });
   
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
// const yup = require('yup');
// router.get((req) => {
//   return NextResponse.json({ message:"ok" });
// });
// // تعريف قواعد التحقق باستخدام Yup
// const validationSchema = yup.object().shape({
//   username: yup.string().required(),
//   email: yup.string().email().required(),
//   // قواعد التحقق الأخرى...
// });

// // استخدام middleware للتحقق من البيانات
// app.post('/upload', validateFormData, (req, res) => {
//   // معالجة البيانات بعد التحقق
//   const { fields } = req;
//   // القيام بما تحتاج إليه مع البيانات المتحققة
//   res.status(200).json({ success: true, data: fields });
// });

// استخدام Express أو أي إطار عمل آخر
export function validate(schema, handler) {
  return async (req, res) => {
    if (["POST", "PUT"].includes(req.method)) {
      try {
        req.body = await schema
          .camelCase()
          .validate(req.body, { abortEarly: false, stripUnknown: true });
      } catch (error) {
        return res.status(400).json(error);
      }
    }
    await handler(req, res);
  };
}
//export async function POST(request) {
//   const formData = await request.formData();
//   for (let pair of formData.entries()) {
//     console.log(pair[0] + ", " + pair[1]);
//   }
//   const file = formData.getAll("files");

//   return Response.json({ message: formData.keys() });
// }
