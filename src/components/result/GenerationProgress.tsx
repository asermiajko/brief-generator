"use client";

import { useEffect, useState } from "react";
import { GENERATION_STAGES } from "@/types/wizard";

export default function GenerationProgress() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => {
        if (prev >= GENERATION_STAGES.length - 1) return prev;
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="w-16 h-16 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-8" />
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Генерируем ваш бриф
      </h2>
      <div className="w-full max-w-md space-y-3">
        {GENERATION_STAGES.map((label, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500
              ${i < stage ? "bg-green-50" : i === stage ? "bg-blue-50" : "bg-gray-50"}`}
          >
            <div className="flex-shrink-0">
              {i < stage ? (
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : i === stage ? (
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              )}
            </div>
            <span
              className={`text-sm font-medium
              ${i < stage ? "text-green-700" : i === stage ? "text-blue-700" : "text-gray-400"}`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
