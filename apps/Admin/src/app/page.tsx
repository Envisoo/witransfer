/** @format */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const router = useRouter();
  const { autenticado, carregando } = useAuth();

  useEffect(() => {
    if (!carregando) {
      if (autenticado) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, [autenticado, carregando, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">witransfer</h1>
        <p className="text-gray-600">Redirecionando...</p>
        <div className="mt-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        </div>
      </div>
    </div>
  );
}
