import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function MyPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-center">マイページ</h1>
          <p className="text-center mt-4">ここはマイページです。</p>
        </div>
      </main>
    </div>
  );
}
