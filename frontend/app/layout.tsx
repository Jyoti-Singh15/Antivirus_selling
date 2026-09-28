import type { Metadata } from "next";
import "./globals.css";
import { ProductsProvider } from "@/context/ProductsContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { CategoryStrip } from "@/components/CategoryStrip";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "RapidDefend: Buy Genuine Antivirus Online | Instant Key Delivery",
  description: "Shop Quick Heal, Kaspersky, Norton, McAfee, Bitdefender, Malwarebytes & ESET Total Security digital license keys at up to 80% off. Instant activation code delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#f1f3f6] antialiased">
        <AuthProvider>
          <ProductsProvider>
            <CartProvider>
              <Navbar />
              <CategoryStrip />
              <main className="flex-1 max-w-7xl w-full mx-auto px-2 sm:px-4 lg:px-6 py-4">
                {children}
              </main>
              <Footer />
            </CartProvider>
          </ProductsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
