import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const sessionId = formData.get("sessionId") as string;
    const step = formData.get("step") as string;

    if (!file) {
      return NextResponse.json({ error: "Файл не найден" }, { status: 400 });
    }

    if (!sessionId || !step) {
      return NextResponse.json(
        { error: "Отсутствуют обязательные поля" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Файл слишком большой (макс. 50МБ)" },
        { status: 400 }
      );
    }

    // Create upload directory if not exists
    await mkdir(UPLOAD_DIR, { recursive: true });

    // Generate unique filename
    const ext = path.extname(file.name);
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const filePath = path.join(UPLOAD_DIR, uniqueName);

    // Write file to disk
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    // Save to DB
    const uploaded = await prisma.uploadedFile.create({
      data: {
        filename: file.name,
        path: `/uploads/${uniqueName}`,
        mimeType: file.type || "application/octet-stream",
        step: Number(step),
        sessionId,
      },
    });

    return NextResponse.json({ id: uploaded.id, filename: uploaded.filename });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Ошибка загрузки файла" },
      { status: 500 }
    );
  }
}
