"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_WIZARD_DATA, WizardData } from "@/types/wizard";
import StepHousingClass from "./StepHousingClass";
import StepSiteType from "./StepSiteType";
import StepSiteGoal from "./StepSiteGoal";
import StepToneOfVoice from "./StepToneOfVoice";
import StepVisualStyle from "./StepVisualStyle";
import StepMaterials from "./StepMaterials";
import StepUTP from "./StepUTP";
import StepReferences from "./StepReferences";

const STORAGE_KEY = "wizard_data";
const STEP_KEY = "wizard_step";
const SESSION_KEY = "wizard_session";

const STEP_TITLES = [
  "Класс жилья",
  "Тип сайта",
  "Цель сайта",
  "Tone of Voice",
  "Визуальный стиль",
  "Материалы",
  "УТП",
  "Референсы",
];

const TOTAL_STEPS = 8;

function getSessionId(): string {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

export default function WizardShell() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(DEFAULT_WIZARD_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const [sessionId] = useState(() => getSessionId());

  // Load from localStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      const savedStep = localStorage.getItem(STEP_KEY);
      if (savedData) setData(JSON.parse(savedData));
      if (savedStep) setStep(Number(savedStep));
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(STEP_KEY, String(step));
  }, [data, step, loaded]);

  const handleChange = useCallback(
    (partial: Partial<WizardData>) => {
      setData((prev) => ({ ...prev, ...partial }));
    },
    []
  );

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return data.housingClass !== null;
      case 1:
        return data.siteType !== null;
      case 2:
        return data.siteGoal !== null;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wizardData: data, sessionId }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Ошибка генерации");
      }

      const { briefId } = await res.json();

      // Navigate first, then clear state (so data survives if navigation fails)
      router.push(`/result/${briefId}`);

      // Clear wizard state after navigation is initiated
      setTimeout(() => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STEP_KEY);
        localStorage.removeItem(SESSION_KEY);
      }, 1000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Произошла ошибка"
      );
      setSubmitting(false);
    }
  };

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return <StepHousingClass data={data} onChange={handleChange} />;
      case 1:
        return <StepSiteType data={data} onChange={handleChange} />;
      case 2:
        return <StepSiteGoal data={data} onChange={handleChange} />;
      case 3:
        return <StepToneOfVoice data={data} onChange={handleChange} />;
      case 4:
        return <StepVisualStyle data={data} onChange={handleChange} />;
      case 5:
        return (
          <StepMaterials
            data={data}
            onChange={handleChange}
            sessionId={sessionId}
          />
        );
      case 6:
        return (
          <StepUTP
            data={data}
            onChange={handleChange}
            sessionId={sessionId}
          />
        );
      case 7:
        return <StepReferences data={data} onChange={handleChange} />;
      default:
        return null;
    }
  };

  const isLastStep = step === TOTAL_STEPS - 1;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-500">
            Шаг {step + 1} из {TOTAL_STEPS}
          </span>
          <span className="text-sm font-medium text-gray-500">
            {STEP_TITLES[step]}
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        {renderStep()}
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="px-6 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition-colors
            disabled:opacity-0 disabled:pointer-events-none"
        >
          &larr; Назад
        </button>

        {isLastStep ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl
              hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed
              flex items-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Генерируем...
              </>
            ) : (
              "Сгенерировать бриф →"
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canProceed()}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl
              hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Далее &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
