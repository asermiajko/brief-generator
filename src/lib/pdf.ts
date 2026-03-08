import puppeteer from "puppeteer";
import { BriefResult } from "@/types/wizard";
import { markdownToHtml, escapeHtml } from "@/lib/markdown";

function briefToHtml(brief: BriefResult): string {
  const sectionsHtml = brief.sections
    .map(
      (section, i) => `
      <div class="section">
        <h2>${i + 1}. ${escapeHtml(section.title)}</h2>
        <div class="content">${markdownToHtml(section.content)}</div>
      </div>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      color: #1a1a1a;
      line-height: 1.6;
      padding: 48px;
      font-size: 14px;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 24px;
      border-bottom: 2px solid #2B5AFF;
    }
    .header h1 {
      font-size: 24px;
      font-weight: 700;
      color: #0A0E14;
      margin-bottom: 8px;
    }
    .header p {
      font-size: 13px;
      color: #5A6170;
    }
    .section {
      margin-bottom: 32px;
      page-break-inside: avoid;
    }
    .section h2 {
      font-size: 18px;
      font-weight: 700;
      color: #2B5AFF;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid #E8EAEE;
    }
    .content h3 {
      font-size: 15px;
      font-weight: 600;
      margin: 16px 0 8px;
      color: #0A0E14;
    }
    .content p { margin-bottom: 8px; }
    .content ul, .content ol {
      margin: 8px 0 8px 20px;
    }
    .content li { margin-bottom: 4px; }
    .content table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 13px;
    }
    .content th, .content td {
      border: 1px solid #E8EAEE;
      padding: 8px 12px;
      text-align: left;
    }
    .content th {
      background: #F5F6F8;
      font-weight: 600;
    }
    .content strong { font-weight: 600; }
    .content em { font-style: italic; }
    .disclaimer {
      margin-top: 40px;
      padding: 16px;
      background: #F5F6F8;
      border-radius: 8px;
      font-size: 12px;
      color: #5A6170;
      text-align: center;
    }
    .cta {
      margin-top: 32px;
      padding: 24px;
      background: #0A0E14;
      color: #fff;
      border-radius: 12px;
      text-align: center;
    }
    .cta h3 { font-size: 16px; margin-bottom: 8px; }
    .cta p { font-size: 13px; color: rgba(255,255,255,0.7); }
  </style>
</head>
<body>
  <div class="header">
    <h1>Бриф на разработку сайта ЖК</h1>
    <p>Сгенерировано: ${new Date(brief.generatedAt).toLocaleDateString("ru-RU")} | idalite.ru</p>
  </div>
  ${sectionsHtml}
  <div class="disclaimer">
    Документ сгенерирован AI на основе анализа 150+ сайтов ЖК. Рекомендуется проверка перед передачей в работу.
  </div>
  <div class="cta">
    <h3>Хотите, чтобы мы собрали этот сайт?</h3>
    <p>Команда idalite специализируется на сайтах ЖК и застройщиков. Мы работаем от брифа сразу в вёрстку — без лишних этапов и переделок.</p>
  </div>
</body>
</html>`;
}

export async function generatePdf(brief: BriefResult): Promise<Buffer> {
  const html = briefToHtml(brief);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", right: "15mm", bottom: "20mm", left: "15mm" },
    });

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
