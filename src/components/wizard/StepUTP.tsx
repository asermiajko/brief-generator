"use client";

import FileUpload from "@/components/ui/FileUpload";
import { WizardData } from "@/types/wizard";

interface Props {
  data: WizardData;
  onChange: (data: Partial<WizardData>) => void;
  sessionId: string;
}

export default function StepUTP({ data, onChange, sessionId }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Основное УТП проекта
      </h2>
      <p className="text-gray-500 mb-6">
        Опишите, чем ваш ЖК отличается от конкурентов. Что делает его
        уникальным для покупателя?
      </p>
      <div className="space-y-6">
        <textarea
          value={data.utp.text}
          onChange={(e) =>
            onChange({ utp: { ...data.utp, text: e.target.value } })
          }
          placeholder="Например: ЖК расположен в 5 минутах от метро, собственный парк 3 га, авторская архитектура от бюро X, закрытый двор без машин..."
          rows={5}
          className="w-full p-4 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
            focus:border-blue-600 focus:ring-0 focus:outline-none transition-colors resize-none"
        />
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Загрузить файлы (необязательно)
          </h3>
          <p className="text-xs text-gray-400 mb-3">
            Презентация проекта, концепция или документ с описанием УТП
          </p>
          <FileUpload
            sessionId={sessionId}
            step={7}
            uploadedFileIds={data.utp.uploadedFiles}
            onUpload={(ids) =>
              onChange({ utp: { ...data.utp, uploadedFiles: ids } })
            }
          />
        </div>
      </div>
    </div>
  );
}
