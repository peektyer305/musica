import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import { createClient } from "@/utils/supabase/server";
import { Toaster } from "react-hot-toast";
import fetchAppUserFromAuthId from "@/lib/fetchAppUserFromAuthId";

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
  const appUser = user ? await fetchAppUserFromAuthId(user.id) : null;
  console.log("appUser:", appUser);
  console.log("authUser:", user);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header authUser={user} appUser={appUser} />
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
