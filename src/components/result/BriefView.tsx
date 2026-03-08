"use client";

import { BriefResult } from "@/types/wizard";
import { markdownToHtml } from "@/lib/markdown";

interface Props {
  brief: BriefResult;
}

export default function BriefView({ brief }: Props) {
  return (
    <div className="space-y-8">
      <div className="text-center pb-6 border-b-2 border-blue-600">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Бриф на разработку сайта ЖК
        </h1>
        <p className="text-sm text-gray-500">
          Сгенерировано:{" "}
          {new Date(brief.generatedAt).toLocaleDateString("ru-RU")}
        </p>
      </div>

      {brief.sections.map((section, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-blue-600 mb-4 pb-3 border-b border-gray-100">
            {i + 1}. {section.title}
          </h2>
          <div
            className="prose prose-gray max-w-none prose-headings:text-base prose-headings:font-semibold
              prose-p:text-sm prose-li:text-sm prose-td:text-sm prose-th:text-sm
              prose-table:border prose-th:bg-gray-50 prose-th:border prose-td:border
              prose-th:p-2 prose-td:p-2"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(section.content) }}
          />
        </div>
      ))}
    </div>
  );
}
