import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, name, company, briefId } = await req.json();

    if (!email || !name || !company || !briefId) {
      return NextResponse.json(
        { error: "Все поля обязательны" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Некорректный email" },
        { status: 400 }
      );
    }

    // Check if lead already exists for this brief
    const existing = await prisma.lead.findUnique({
      where: { briefId },
    });

    if (existing) {
      return NextResponse.json({ id: existing.id });
    }

    const lead = await prisma.lead.create({
      data: { email, name, company, briefId },
    });

    return NextResponse.json({ id: lead.id });
  } catch (error) {
    console.error("Lead error:", error);
    return NextResponse.json(
      { error: "Ошибка сохранения данных" },
      { status: 500 }
    );
  }
}
