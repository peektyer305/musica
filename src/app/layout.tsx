import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import { createClient } from "@/utils/supabase/server";
import fetchUserIconFromDb from "@/lib/fetchUserIconFromDb";

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
  //サーバーでユーザー情報所得→クライアントに伝播
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  //dbにユーザーアイコンがある場合は取得し入れ替える
  const userIcon = await fetchUserIconFromDb(user?.id || null);
  console.log("userId:", user?.id);
  user && (user.user_metadata && (user.user_metadata.avatar_url = userIcon));
  console.log("userIcon:", userIcon);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header initialUser={user} />
        <div className="pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
