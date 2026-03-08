import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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

    return NextResponse.json({
      result: brief.result,
      hasLead: !!brief.lead,
    });
  } catch (error) {
    console.error("Brief fetch error:", error);
    return NextResponse.json(
      { error: "Ошибка загрузки брифа" },
      { status: 500 }
    );
  }
}
