"use client";

import { useState } from "react";
import { Reference, WizardData } from "@/types/wizard";

interface Props {
  data: WizardData;
  onChange: (data: Partial<WizardData>) => void;
}

export default function StepReferences({ data, onChange }: Props) {
  const [url, setUrl] = useState("");

  const addReference = (liked: boolean) => {
    const trimmed = url.trim();
    if (!trimmed) return;
    const newRef: Reference = { url: trimmed, liked };
    onChange({ references: [...data.references, newRef] });
    setUrl("");
  };

  const removeReference = (index: number) => {
    const updated = data.references.filter((_, i) => i !== index);
    onChange({ references: updated });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Референсы</h2>
      <p className="text-gray-500 mb-6">
        Укажите сайты ЖК, которые вам нравятся или не нравятся. Это поможет
        сформировать дизайн-концепцию.
      </p>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 p-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
              focus:border-blue-600 focus:ring-0 focus:outline-none transition-colors"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addReference(true);
              }
            }}
          />
          <button
            type="button"
            onClick={() => addReference(true)}
            className="px-4 py-3 bg-green-50 text-green-700 font-semibold rounded-xl border-2 border-green-200
              hover:bg-green-100 transition-colors whitespace-nowrap"
          >
            + Нравится
          </button>
          <button
            type="button"
            onClick={() => addReference(false)}
            className="px-4 py-3 bg-red-50 text-red-700 font-semibold rounded-xl border-2 border-red-200
              hover:bg-red-100 transition-colors whitespace-nowrap"
          >
            + Не нравится
          </button>
        </div>

        {data.references.length > 0 && (
          <div className="space-y-2">
            {data.references.map((ref, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-3 rounded-lg border
                  ${ref.liked ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full
                    ${ref.liked ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
                  >
                    {ref.liked ? "+" : "−"}
                  </span>
                  <span className="text-sm text-gray-700 truncate">
                    {ref.url}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeReference(i)}
                  className="text-gray-400 hover:text-red-500 transition-colors ml-2 flex-shrink-0"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {data.references.length === 0 && (
          <p className="text-sm text-gray-400 italic">
            Пока не добавлено ни одного референса. Это необязательный шаг.
          </p>
        )}
      </div>
    </div>
  );
}
