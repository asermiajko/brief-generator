export default function CTABlock() {
  return (
    <div className="bg-gray-900 text-white rounded-2xl p-8 text-center">
      <h3 className="text-xl font-bold mb-3">
        Хотите, чтобы мы собрали этот сайт?
      </h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">
        Команда idalite специализируется на сайтах ЖК и застройщиков. Мы
        работаем от брифа сразу в вёрстку — без лишних этапов и переделок.
      </p>
      <a
        href="https://idalite.ru"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl
          hover:bg-blue-700 transition-colors"
      >
        Обсудить проект &rarr;
      </a>
    </div>
  );
}
