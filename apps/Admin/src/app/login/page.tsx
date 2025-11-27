/** @format */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import type { LoginRequest } from "@/types/api";

export default function LoginPage() {
  const router = useRouter();
  const { login, autenticado, carregando } = useAuth();

  const [form, setForm] = useState<LoginRequest>({
    email: "",
    senha: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!carregando && autenticado) {
      router.replace("/dashboard");
    }
  }, [autenticado, carregando, router]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setSubmitting(true);
    try {
      await login(form);
      router.replace("/dashboard");
    } catch (err: any) {
      const message =
        err?.message || "Falha ao iniciar sessão. Verifique as credenciais.";
      setErro(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          witransfer
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Entrar na área administrativa
        </p>

        {erro && (
          <div className="mb-4 rounded bg-red-50 text-red-700 px-3 py-2 text-sm border border-red-200">
            {erro}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-600 focus:ring-teal-600"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              autoComplete="current-password"
              required
              value={form.senha}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-600 focus:ring-teal-600"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center rounded-md bg-teal-600 px-4 py-2 text-white font-medium hover:bg-teal-700 disabled:opacity-60">
            {submitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
