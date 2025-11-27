/** @format */

import type { Metadata } from "next";
import "./globals.css";
//import ToasterProvider from "@/components/providers/ToasterProvider";

export const metadata: Metadata = {
  title: "witransfer - Sistema de Gestão de Transporte",
  description: "witransfer: Sistema completo de gestão de transporte e táxis",
  keywords: [
    "taxi",
    "transporte",
    "gestão",
    "sistema",
    "motoristas",
    "clientes",
  ],
  authors: [{ name: "witransfer" }],
  creator: "witransfer",
  publisher: "witransfer",
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0d9488",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-AO">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-50 text-gray-900">
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
