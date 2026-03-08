"use client";

import { useState } from "react";

interface Props {
  briefId: string;
  onSuccess: () => void;
}

export default function LeadForm({ briefId, onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, company, briefId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка");
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения");
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Скачать бриф в PDF
      </h3>
      <p className="text-gray-500 mb-6">
        Заполните форму, чтобы получить документ
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Имя
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Александр"
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
              focus:border-blue-600 focus:ring-0 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="marketing@developer.ru"
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
              focus:border-blue-600 focus:ring-0 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Компания
          </label>
          <input
            id="company"
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="ГК Застройщик"
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
              focus:border-blue-600 focus:ring-0 focus:outline-none transition-colors"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl
            hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Сохранение..." : "Скачать PDF"}
        </button>
      </form>
    </div>
  );
}
