import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Генератор брифа на сайт ЖК — idalite",
  description:
    "AI-визард для создания профессионального брифа на сайт ЖК за 15 минут. Анализ 150+ сайтов ЖК.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="font-[family-name:var(--font-manrope)] bg-gray-50 text-gray-900 antialiased">
        {/* Nav */}
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <a
              href="/"
              className="text-lg font-extrabold uppercase tracking-tight text-gray-900"
            >
              Идалайт
            </a>
            <a
              href="/wizard"
              className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full
                hover:bg-blue-700 transition-colors"
            >
              Сгенерировать бриф
            </a>
          </div>
        </nav>

        {/* Main */}
        <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>

        {/* Footer */}
        <footer className="border-t border-gray-200 mt-12">
          <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-gray-400">
            <span>&copy; 2026 idalite</span>
            <span className="italic">
              AI-генератор на основе анализа 150+ сайтов ЖК
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
