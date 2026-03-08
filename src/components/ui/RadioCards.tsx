"use client";

interface RadioCardsProps<T extends string> {
  options: { value: T; label: string; description?: string }[];
  value: T | null;
  onChange: (value: T) => void;
}

export default function RadioCards<T extends string>({
  options,
  value,
  onChange,
}: RadioCardsProps<T>) {
  return (
    <div className="grid gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200
            ${
              value === option.value
                ? "border-blue-600 bg-blue-50 shadow-sm"
                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
            }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
              ${
                value === option.value
                  ? "border-blue-600"
                  : "border-gray-300"
              }`}
            >
              {value === option.value && (
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              )}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{option.label}</div>
              {option.description && (
                <div className="text-sm text-gray-500 mt-0.5">
                  {option.description}
                </div>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
