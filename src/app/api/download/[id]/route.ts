import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generatePdf } from "@/lib/pdf";
import { BriefResult } from "@/types/wizard";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const brief = await prisma.brief.findUnique({
      where: { id },
      include: { lead: true },
    });

    if (!brief) {
      return NextResponse.json(
        { error: "Бриф не найден" },
        { status: 404 }
      );
    }

    if (!brief.lead) {
      return NextResponse.json(
        { error: "Заполните форму перед скачиванием" },
        { status: 403 }
      );
    }

    if (!brief.result) {
      return NextResponse.json(
        { error: "Бриф ещё не сгенерирован" },
        { status: 400 }
      );
    }

    const pdfBuffer = await generatePdf(brief.result as unknown as BriefResult);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="brief-${id}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF error:", error);
    return NextResponse.json(
      { error: "Ошибка генерации PDF" },
      { status: 500 }
    );
  }
}
