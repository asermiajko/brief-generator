"use client";

import { useCallback, useState } from "react";

interface FileUploadProps {
  sessionId: string;
  step: number;
  uploadedFileIds: string[];
  onUpload: (fileIds: string[]) => void;
}

interface UploadedFileInfo {
  id: string;
  filename: string;
}

export default function FileUpload({
  sessionId,
  step,
  uploadedFileIds,
  onUpload,
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFileInfo[]>(() =>
    // Initialize from parent's IDs so previously uploaded files show on re-mount
    uploadedFileIds.map((id) => ({ id, filename: `Файл (${id.slice(0, 6)}...)` }))
  );
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    async (fileList: FileList) => {
      setUploading(true);
      setError(null);

      const newFiles: UploadedFileInfo[] = [];

      for (const file of Array.from(fileList)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("sessionId", sessionId);
        formData.append("step", String(step));

        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || "Ошибка загрузки");
          }

          const data = await res.json();
          newFiles.push({ id: data.id, filename: data.filename });
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Ошибка загрузки файла"
          );
        }
      }

      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onUpload([...uploadedFileIds, ...newFiles.map((f) => f.id)]);
      setUploading(false);
    },
    [files, uploadedFileIds, onUpload, sessionId, step]
  );

  const removeFile = (id: string) => {
    const updated = files.filter((f) => f.id !== id);
    setFiles(updated);
    onUpload(uploadedFileIds.filter((fid) => fid !== id));
  };

  return (
    <div className="space-y-3">
      <label
        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl
          cursor-pointer transition-colors
          ${uploading ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"}`}
      >
        <div className="flex flex-col items-center text-sm text-gray-500">
          {uploading ? (
            <span className="text-blue-600 font-medium">Загрузка...</span>
          ) : (
            <>
              <svg
                className="w-8 h-8 mb-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 16V4m0 0L8 8m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                />
              </svg>
              <span>Нажмите или перетащите файлы</span>
              <span className="text-xs text-gray-400 mt-1">
                PDF, презентации, изображения, архивы
              </span>
            </>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          multiple
          accept=".pdf,.pptx,.ppt,.doc,.docx,.zip,.rar,.jpg,.jpeg,.png"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          disabled={uploading}
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-sm text-gray-700 truncate">
                {file.filename}
              </span>
              <button
                type="button"
                onClick={() => removeFile(file.id)}
                className="text-gray-400 hover:text-red-500 transition-colors ml-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
