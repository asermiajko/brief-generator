"use client";

import Slider from "@/components/ui/Slider";
import RadioCards from "@/components/ui/RadioCards";
import {
  COLOR_SCHEME_LABELS,
  VisualStyle,
  WizardData,
} from "@/types/wizard";

interface Props {
  data: WizardData;
  onChange: (data: Partial<WizardData>) => void;
}

const colorOptions = (
  Object.entries(COLOR_SCHEME_LABELS) as [VisualStyle["colorScheme"], string][]
).map(([value, label]) => ({ value, label }));

export default function StepVisualStyle({ data, onChange }: Props) {
  const update = (partial: Partial<VisualStyle>) => {
    onChange({ visualStyle: { ...data.visualStyle, ...partial } });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Визуальный стиль
      </h2>
      <p className="text-gray-500 mb-6">
        Определите визуальные характеристики дизайна сайта.
      </p>
      <div className="space-y-8">
        <Slider
          value={data.visualStyle.composition}
          onChange={(v) => update({ composition: v })}
          leftLabel="Простая композиция"
          rightLabel="Динамичная композиция"
        />
        <Slider
          value={data.visualStyle.typography}
          onChange={(v) => update({ typography: v })}
          leftLabel="Без засечек"
          rightLabel="С засечками"
        />
        <Slider
          value={data.visualStyle.shapes}
          onChange={(v) => update({ shapes: v })}
          leftLabel="Прямые формы"
          rightLabel="Закруглённые формы"
        />
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Цветовая схема
          </h3>
          <RadioCards
            options={colorOptions}
            value={data.visualStyle.colorScheme}
            onChange={(v) => update({ colorScheme: v })}
          />
        </div>
      </div>
    </div>
  );
}
