import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import AuthSync from "@/components/custom/AuthSync";
import { AuthStoreProvider } from "@/stores/authStore";
import { createClient } from "@/utils/supabase/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Musica",
  description: "share your favorite music with the world",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* SSRの初期ユーザーをZustandに注入する */}
        <AuthStoreProvider initialUser={user}>
          <AuthSync />
          <Header />
          <div className="pt-20">{children}</div>
          <Footer />
        </AuthStoreProvider>
      </body>
    </html>
  );
}
