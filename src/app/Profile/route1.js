import { createRouter, expressWrapper } from "next-connect";
import multer from "multer";
import { NextResponse } from "next/server";
import path from "path";
import formidable from "formidable";

const uploadPath = path.join(__dirname, "../../files_tamer");
const upload = multer({ dest: uploadPath });

const router = createRouter();
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
router
 
  .get((req, res) => {
    // معالجة البيانات النصية والملفات

    return NextResponse.json({
      message: "User has been created",
    });
  }) .use(async (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadPath;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) return next(err);
      req.body = fields;
      req.files = files;
      next();
    });
  })
  .post((req, res) => {
    console.log(req.body); // يحتوي على الحقول النصية
    console.log(req.files); // يحتوي على الملفات المحملة
    return NextResponse.json({
      message: "File uploaded",
    });
  });


export const config = {
  api: {
    bodyParser: false, // تعطيل التحليل الآلي للبيانات في Next.js لأن multer سيتولى ذلك
  },
};
export async function GET(request, ctx) {
  return router.run(request, ctx);
}
export async function POST(request, ctx) {
    
  return router.run(request, ctx);
}




