"use client";

import RadioCards from "@/components/ui/RadioCards";
import { SiteGoal, SITE_GOAL_LABELS, WizardData } from "@/types/wizard";

interface Props {
  data: WizardData;
  onChange: (data: Partial<WizardData>) => void;
}

const options = (
  Object.entries(SITE_GOAL_LABELS) as [SiteGoal, string][]
).map(([value, label]) => ({ value, label }));

export default function StepSiteGoal({ data, onChange }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Цель сайта</h2>
      <p className="text-gray-500 mb-6">
        Какая основная задача сайта?
      </p>
      <RadioCards
        options={options}
        value={data.siteGoal}
        onChange={(v) => onChange({ siteGoal: v })}
      />
    </div>
  );
}
