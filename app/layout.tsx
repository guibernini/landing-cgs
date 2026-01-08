import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CGS Corretora",
  description: "Especialistas em Proteção Patrimonial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}