// ── Шаг 1: Класс жилья ──
export type HousingClass = "economy" | "comfort" | "business" | "premium";

export const HOUSING_CLASS_LABELS: Record<HousingClass, string> = {
  economy: "Эконом",
  comfort: "Комфорт",
  business: "Бизнес",
  premium: "Премиум",
};

// ── Шаг 2: Тип сайта ──
export type SiteType = "mono" | "multi" | "developer";

export const SITE_TYPE_LABELS: Record<SiteType, string> = {
  mono: "Монопроект (1 ЖК)",
  multi: "Несколько ЖК",
  developer: "Сайт застройщика",
};

// ── Шаг 3: Цель сайта ──
export type SiteGoal = "organic" | "brand" | "mixed";

export const SITE_GOAL_LABELS: Record<SiteGoal, string> = {
  organic:
    "Брендовый сайт для поддержки органического трафика с конверсией в звонок",
  brand: "Имидж бренда (поддержка бренда и концепции застройщика)",
  mixed: "Органика + платный трафик",
};

// ── Шаг 4: Tone of Voice (5 шкал, значения 1-10) ──
export interface ToneOfVoice {
  playfulSerious: number; // игривый ↔ серьёзный
  affordablePremium: number; // доступный ↔ дорогой
  innovativeConservative: number; // инновационный ↔ консервативный
  creativeSimple: number; // креативный ↔ простой
  softAggressive: number; // мягкий ↔ агрессивный
}

export const TOV_SCALE_LABELS: {
  key: keyof ToneOfVoice;
  left: string;
  right: string;
}[] = [
  { key: "playfulSerious", left: "Игривый", right: "Серьёзный" },
  { key: "affordablePremium", left: "Доступный", right: "Дорогой" },
  {
    key: "innovativeConservative",
    left: "Инновационный",
    right: "Консервативный",
  },
  { key: "creativeSimple", left: "Креативный", right: "Простой" },
  { key: "softAggressive", left: "Мягкий", right: "Агрессивный" },
];

// ── Шаг 5: Визуальный стиль ──
export interface VisualStyle {
  composition: number; // простая ↔ динамичная
  typography: number; // без засечек ↔ с засечками
  shapes: number; // прямые ↔ закруглённые
  colorScheme: "mono-dark" | "mono-light" | "colorful" | "combined";
}

export const COLOR_SCHEME_LABELS: Record<VisualStyle["colorScheme"], string> = {
  "mono-dark": "Монохром тёмный",
  "mono-light": "Монохром светлый",
  colorful: "Цветная яркая",
  combined: "Комбинированная",
};

// ── Шаг 6: Материалы ──
export interface Materials {
  renders: boolean;
  photos: boolean;
  layouts: boolean; // планировки
  genplan: boolean;
  brandbook: boolean;
  uploadedFiles: string[]; // IDs загруженных файлов
}

// ── Шаг 7: УТП ──
export interface UTP {
  text: string;
  uploadedFiles: string[];
}

// ── Шаг 8: Референсы ──
export interface Reference {
  url: string;
  liked: boolean; // true = нравится, false = не нравится
}

// ── Полные данные визарда ──
export interface WizardData {
  housingClass: HousingClass | null;
  siteType: SiteType | null;
  siteGoal: SiteGoal | null;
  toneOfVoice: ToneOfVoice;
  visualStyle: VisualStyle;
  materials: Materials;
  utp: UTP;
  references: Reference[];
}

export const DEFAULT_WIZARD_DATA: WizardData = {
  housingClass: null,
  siteType: null,
  siteGoal: null,
  toneOfVoice: {
    playfulSerious: 5,
    affordablePremium: 5,
    innovativeConservative: 5,
    creativeSimple: 5,
    softAggressive: 5,
  },
  visualStyle: {
    composition: 5,
    typography: 5,
    shapes: 5,
    colorScheme: "combined",
  },
  materials: {
    renders: false,
    photos: false,
    layouts: false,
    genplan: false,
    brandbook: false,
    uploadedFiles: [],
  },
  utp: {
    text: "",
    uploadedFiles: [],
  },
  references: [],
};

// ── Результат генерации брифа ──
export interface BriefSection {
  title: string;
  content: string; // Markdown
}

export interface BriefResult {
  sections: BriefSection[];
  generatedAt: string;
}

// ── Этапы генерации (для прогресс-бара) ──
export const GENERATION_STAGES = [
  "Анализируем структуру сайта...",
  "Подбираем функционал под ваш класс жилья...",
  "Формируем чеклист материалов...",
  "Создаём дизайн-концепцию...",
  "Выстраиваем CTA-стратегию...",
] as const;
