"use client";

import CheckboxGroup from "@/components/ui/CheckboxGroup";
import FileUpload from "@/components/ui/FileUpload";
import { WizardData } from "@/types/wizard";

interface Props {
  data: WizardData;
  onChange: (data: Partial<WizardData>) => void;
  sessionId: string;
}

const MATERIAL_OPTIONS = [
  { key: "renders", label: "Рендеры" },
  { key: "photos", label: "Фотографии объекта" },
  { key: "layouts", label: "Планировки квартир" },
  { key: "genplan", label: "Генплан" },
  { key: "brandbook", label: "Брендбук / фирменный стиль" },
];

export default function StepMaterials({ data, onChange, sessionId }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Материалы проекта
      </h2>
      <p className="text-gray-500 mb-6">
        Отметьте, какие материалы у вас уже готовы. Это повлияет на чеклист
        подготовки к старту.
      </p>
      <div className="space-y-6">
        <CheckboxGroup
          options={MATERIAL_OPTIONS}
          values={{
            renders: data.materials.renders,
            photos: data.materials.photos,
            layouts: data.materials.layouts,
            genplan: data.materials.genplan,
            brandbook: data.materials.brandbook,
          }}
          onChange={(key, checked) =>
            onChange({
              materials: { ...data.materials, [key]: checked },
            })
          }
        />
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Загрузить файлы (необязательно)
          </h3>
          <p className="text-xs text-gray-400 mb-3">
            Презентация проекта, PDF, брендбук или архив с материалами
          </p>
          <FileUpload
            sessionId={sessionId}
            step={6}
            uploadedFileIds={data.materials.uploadedFiles}
            onUpload={(ids) =>
              onChange({
                materials: { ...data.materials, uploadedFiles: ids },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
