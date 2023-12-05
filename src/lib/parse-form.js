import mime from "mime";
import { join } from "path";
import formidable from "formidable";


export const parseForm = async (req) => {
  return await new Promise(async (resolve, reject) => {
    
const uploadPath = join(__dirname, "../../files_tamer");

    const form = formidable({
      maxFiles: 10,
      maxFileSize: 1024 * 1024 * 10, // 10mb
      uploadPath,
      filename: (_name, _ext, part) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${part.name || "unknown"}-${uniqueSuffix}.${
          mime.getExtension(part.mimetype || "") || "unknown"
        }`;
        return filename;
      },
      filter: (part) => {
        return (
          part.name === "files" && (part.mimetype?.includes("image") || false)
        );
      },
    });

    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};
