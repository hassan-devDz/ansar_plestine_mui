import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const uploadPath = path.join(__dirname, "../../files_tamer");
export async function POST(request) {
  const formData = await request.formData();
  const file = formData.getAll("files");

  if (file && file instanceof File) {
    const filePath = `${uploadPath}/${file.name}`;
    await writeFile(filePath, new Buffer.from(await file.arrayBuffer()));
    console.log("File saved to", filePath);
    return NextResponse.json({message:"ok"})
  }
}
