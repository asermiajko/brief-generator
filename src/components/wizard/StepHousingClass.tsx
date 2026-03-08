"use client";

import RadioCards from "@/components/ui/RadioCards";
import {
  HousingClass,
  HOUSING_CLASS_LABELS,
  WizardData,
} from "@/types/wizard";

interface Props {
  data: WizardData;
  onChange: (data: Partial<WizardData>) => void;
}

const options = (
  Object.entries(HOUSING_CLASS_LABELS) as [HousingClass, string][]
).map(([value, label]) => ({ value, label }));

export default function StepHousingClass({ data, onChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Класс жилья</h2>
      <p className="text-gray-500 mb-6">
        Выберите класс жилья вашего ЖК. Это определит рекомендации по структуре,
        функционалу и дизайну сайта.
      </p>
      <RadioCards
        options={options}
        value={data.housingClass}
        onChange={(v) => onChange({ housingClass: v })}
      />
    </div>
  );
}
