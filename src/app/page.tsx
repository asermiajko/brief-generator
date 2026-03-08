import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight">
        Профессиональный бриф
        <br />
        на сайт ЖК за{" "}
        <span className="text-blue-600">15 минут</span>
      </h1>
      <p className="text-lg text-gray-500 max-w-lg mb-8 leading-relaxed">
        AI-визард задаёт правильные вопросы, опирается на анализ 150+ сайтов ЖК
        и генерирует документ, который можно сразу отдавать подрядчику.
      </p>
      <Link
        href="/wizard"
        className="px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-full
          hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
      >
        Сгенерировать бриф &rarr;
      </Link>
    </div>
  );
}
