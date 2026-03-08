"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BriefResult } from "@/types/wizard";
import BriefView from "@/components/result/BriefView";
import GenerationProgress from "@/components/result/GenerationProgress";
import LeadForm from "@/components/result/LeadForm";
import CTABlock from "@/components/result/CTABlock";

interface BriefData {
  result: BriefResult | null;
  hasLead: boolean;
}

export default function ResultPage() {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<BriefData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    let cancelled = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 60; // 2 minutes max

    const poll = async () => {
      try {
        attempts++;
        const res = await fetch(`/api/brief/${id}`);
        if (cancelled) return;
        if (!res.ok) {
          setError("Бриф не найден");
          setLoading(false);
          return;
        }
        const json = await res.json();
        if (json.result) {
          setData(json);
          setLoading(false);
        } else if (!cancelled) {
          if (attempts >= MAX_ATTEMPTS) {
            setError("Генерация заняла слишком много времени. Попробуйте ещё раз.");
            setLoading(false);
            return;
          }
          timerId = setTimeout(poll, 2000);
        }
      } catch {
        if (!cancelled) {
          setError("Ошибка загрузки");
          setLoading(false);
        }
      }
    };

    poll();

    return () => {
      cancelled = true;
      clearTimeout(timerId);
    };
  }, [id]);

  const handleDownload = () => {
    if (data?.hasLead) {
      // Already submitted lead, download directly
      window.open(`/api/download/${id}`, "_blank");
      setDownloaded(true);
    } else {
      setShowForm(true);
    }
  };

  const handleLeadSuccess = () => {
    setShowForm(false);
    window.open(`/api/download/${id}`, "_blank");
    setDownloaded(true);
    setData((prev) => (prev ? { ...prev, hasLead: true } : prev));
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Ошибка</h2>
          <p className="text-gray-500">{error}</p>
          <a
            href="/wizard"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl
              hover:bg-blue-700 transition-colors"
          >
            Попробовать снова
          </a>
        </div>
      </div>
    );
  }

  if (loading || !data?.result) {
    return <GenerationProgress />;
  }

  return (
    <div className="space-y-8">
      <BriefView brief={data.result} />

      {/* Download section */}
      <div className="sticky bottom-0 bg-gray-50/90 backdrop-blur-lg py-4 -mx-6 px-6 border-t border-gray-200">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div>
            <p className="font-semibold text-gray-900">Бриф готов</p>
            <p className="text-sm text-gray-500">
              {downloaded
                ? "PDF скачан"
                : "Скачайте документ в PDF"}
            </p>
          </div>
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl
              hover:bg-blue-700 transition-colors"
          >
            {downloaded ? "Скачать ещё раз" : "Скачать PDF"} &darr;
          </button>
        </div>
      </div>

      {/* Lead form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md">
            <LeadForm briefId={id} onSuccess={handleLeadSuccess} />
            <button
              onClick={() => setShowForm(false)}
              className="w-full mt-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="p-4 bg-gray-100 rounded-xl text-center text-sm text-gray-500 italic">
        Документ сгенерирован AI на основе анализа 150+ сайтов ЖК. Рекомендуется
        проверка перед передачей в работу.
      </div>

      {/* CTA */}
      <CTABlock />
    </div>
  );
}
