import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import { createClient } from "@/utils/supabase/server";
import fetchUserIconFromAuthId from "@/lib/fetchUserIconFromAuthId";
import { Toaster } from "react-hot-toast";

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
  if (user) {
    if(user.user_metadata.avatar_url){
      console.log("user:", user);
      const userIcon = await fetchUserIconFromAuthId(user.id, user.user_metadata.avatar_url);
      if (userIcon) {
        user.user_metadata.avatar_url = userIcon;
        console.log("Fetched user icon:", userIcon); // デバッグ用ログ
      }
    } else {
      const userIcon = await fetchUserIconFromAuthId(user.id, "@static/default_user_icon.png");
      console.log("No avatar_url in user metadata, using default icon.");
      user.user_metadata.avatar_url = userIcon; // デフォルトアイコンを設定
    }
    
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header initialUser={user} />
        <div className="pt-20">{children}</div>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
