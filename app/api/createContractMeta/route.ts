import fs from "fs-extra";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = await req.json();

  try {
    const { title, jsonContent } = res;
    console.log(title, jsonContent);
    const file = `/tmp/${title}-metadata.json`;

    await fs.outputFileSync(file, jsonContent);
    const data = await fs.readFileSync(file, "utf8");
    console.log(data, "data");

    new Response(
      `message: File at ${file} with ${data} created successfully. `
    );
  } catch (error) {
    console.error(error);
    new Response(" error: An error occurred while creating the file.");
  }
  return NextResponse.json({ res });
}
