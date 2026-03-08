"use client";

interface CheckboxGroupProps {
  options: { key: string; label: string }[];
  values: Record<string, boolean>;
  onChange: (key: string, checked: boolean) => void;
}

export default function CheckboxGroup({
  options,
  values,
  onChange,
}: CheckboxGroupProps) {
  return (
    <div className="grid gap-3">
      {options.map((option) => (
        <label
          key={option.key}
          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
            ${
              values[option.key]
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
        >
          <input
            type="checkbox"
            checked={values[option.key] || false}
            onChange={(e) => onChange(option.key, e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="font-medium text-gray-900">{option.label}</span>
        </label>
      ))}
    </div>
  );
}
