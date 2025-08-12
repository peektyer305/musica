import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, Mail, Lock, ArrowRight } from "lucide-react";

import { login, signInWithGithub } from "./actions";
import GithubButton from "@/components/custom/GithubButton";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <Card className="shadow-xl border-0">
            <form>
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl text-center">ログイン</CardTitle>
                <CardDescription className="text-center">
                  メールアドレスとパスワードを入力してください
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    メールアドレス
                  </Label>
                  <div className="relative">
                    <Mail className="h-4 w-4 text-gray-400 absolute left-3 top-4.5" />
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      className="h-12 pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      パスワード
                    </Label>
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:text-blue-500"
                    >
                      パスワードを忘れた場合
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="パスワードを入力"
                      className="pl-10 pr-10 h-12"
                      required
                    />
                    <button
                      type="button"
                      className="cursor-pointer absolute right-3 top-4 h-4 w-4 text-gray-400 hover:text-gray-600"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    ログイン状態を保持する
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 pt-6">
                {/* Login Button */}
                <Button
                  formAction={login}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer"
                >
                  ログイン
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {/* Sign Up Link */}
                <div className="text-center text-sm text-gray-600">
                  アカウントをお持ちでない場合は{" "}
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    新規登録
                  </a>
                </div>
              </CardFooter>
            </form>
            <div className="text-center">
              <p className="px-2 text-xs text-gray-800">
                またはソーシャルログインを使用
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 mx-auto">
              <Button
                variant="outline"
                className="h-12 bg-transparent cursor-pointer"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                GitHub
              </Button>
              <GithubButton />
            </div>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center text-xs text-gray-500">
            ログインすることで、
            <a href="#" className="text-blue-600 hover:text-blue-500">
              利用規約
            </a>
            および
            <a href="#" className="text-blue-600 hover:text-blue-500">
              プライバシーポリシー
            </a>
            に同意したものとみなされます。
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 border-t bg-white/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span>© 2025 Musica. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-gray-900">
              ヘルプ
            </a>
            <a href="#" className="hover:text-gray-900">
              お問い合わせ
            </a>
            <a href="#" className="hover:text-gray-900">
              プライバシー
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
