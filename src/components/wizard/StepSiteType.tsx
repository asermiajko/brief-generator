"use client";

import RadioCards from "@/components/ui/RadioCards";
import { SiteType, SITE_TYPE_LABELS, WizardData } from "@/types/wizard";

interface Props {
  data: WizardData;
  onChange: (data: Partial<WizardData>) => void;
}

const options = (
  Object.entries(SITE_TYPE_LABELS) as [SiteType, string][]
).map(([value, label]) => ({ value, label }));

export default function StepSiteType({ data, onChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Тип сайта</h2>
      <p className="text-gray-500 mb-6">
        Для какого формата вам нужен сайт?
      </p>
      <RadioCards
        options={options}
        value={data.siteType}
        onChange={(v) => onChange({ siteType: v })}
      />
    </div>
  );
}
