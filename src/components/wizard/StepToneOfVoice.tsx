"use client";

import Slider from "@/components/ui/Slider";
import { TOV_SCALE_LABELS, ToneOfVoice, WizardData } from "@/types/wizard";

interface Props {
  data: WizardData;
  onChange: (data: Partial<WizardData>) => void;
}

export default function StepToneOfVoice({ data, onChange }: Props) {
  const handleChange = (key: keyof ToneOfVoice, value: number) => {
    onChange({
      toneOfVoice: { ...data.toneOfVoice, [key]: value },
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Tone of Voice</h2>
      <p className="text-gray-500 mb-6">
        Настройте тон коммуникации вашего сайта. Перемещайте ползунки между
        крайними значениями.
      </p>
      <div className="space-y-8">
        {TOV_SCALE_LABELS.map((scale) => (
          <Slider
            key={scale.key}
            value={data.toneOfVoice[scale.key]}
            onChange={(v) => handleChange(scale.key, v)}
            leftLabel={scale.left}
            rightLabel={scale.right}
          />
        ))}
      </div>
    </div>
  );
}
