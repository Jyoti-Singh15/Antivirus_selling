import type { Metadata } from "next";
import "./globals.css";
import { AdminDataProvider } from "../context/AdminDataContext";
import { AdminShell } from "../components/AdminShell";

export const metadata: Metadata = {
  title: "RapidDefend Admin | Antivirus & License Key Operations",
  description: "Administrative control center for digital antivirus catalog, license key vault, and order fulfillment."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900">
        <AdminDataProvider>
          <AdminShell>{children}</AdminShell>
        </AdminDataProvider>
      </body>
    </html>
  );
}
