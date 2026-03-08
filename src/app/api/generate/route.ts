import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { generateBrief } from "@/lib/anthropic";
import { WizardData } from "@/types/wizard";

// Allow up to 120 seconds for AI generation
export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { wizardData, sessionId } = body as {
      wizardData: WizardData;
      sessionId: string;
    };

    if (!wizardData || !wizardData.housingClass || !wizardData.siteType || !wizardData.siteGoal) {
      return NextResponse.json(
        { error: "Заполните все обязательные поля визарда" },
        { status: 400 }
      );
    }

    // Create brief record
    const brief = await prisma.brief.create({
      data: {
        wizardData: wizardData as unknown as Prisma.InputJsonValue,
      },
    });

    // Link uploaded files to brief
    if (sessionId) {
      await prisma.uploadedFile.updateMany({
        where: { sessionId },
        data: { briefId: brief.id },
      });
    }

    // Generate brief via AI
    const result = await generateBrief(wizardData);

    // Update brief with result
    await prisma.brief.update({
      where: { id: brief.id },
      data: { result: result as unknown as Prisma.InputJsonValue },
    });

    return NextResponse.json({ briefId: brief.id });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Ошибка генерации брифа. Попробуйте ещё раз." },
      { status: 500 }
    );
  }
}
