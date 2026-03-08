"use client";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  leftLabel: string;
  rightLabel: string;
  min?: number;
  max?: number;
}

export default function Slider({
  value,
  onChange,
  leftLabel,
  rightLabel,
  min = 1,
  max = 10,
}: SliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-500">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:shadow-md"
      />
      <div className="text-center text-sm font-medium text-gray-700">
        {value} / {max}
      </div>
    </div>
  );
}
