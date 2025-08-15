"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Music, Info, PlusCircle, LogOut, LogIn, UserPlus, User } from "lucide-react";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type HeaderProps = {
    initialUser: any | null;
  };

export default function Header({ initialUser }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [musicUrl, setMusicUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isLogin = !!initialUser;
  const userIcon = initialUser?.user_metadata?.avatar_url || null;

  //投稿処理
  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim() || !musicUrl.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: postTitle.trim(),
          content: postContent.trim(),
          music_url: musicUrl.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create post');
      }

      // Reset form and close modal on success
      setPostTitle("");
      setPostContent("");
      setMusicUrl("");
      setPostModalOpen(false);
      
      // Optionally refresh the page to show the new post
      window.location.reload();
    } catch (error) {
      console.error('Error creating post:', error);
      // TODO: Show user-friendly error message
      alert(error instanceof Error ? error.message : 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  // スクロール時のヘッダー表示制御
  const controlHeader = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // スクロールアップまたは上部にいる場合は表示
        setIsVisible(true);
      } else {
        // スクロールダウンの場合は非表示
        setIsVisible(false);
        setMenuOpen(false); // モバイルメニューを閉じる
      }
      
      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader);
      return () => {
        window.removeEventListener('scroll', controlHeader);
      };
    }
  }, [lastScrollY]);
  return (
    <header className={`bg-gradient-to-r from-purple-600 to-indigo-600 text-white fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto px-6 md:py-2 py-4 flex items-center justify-between">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="text-2xl font-extrabold tracking-tight flex items-center"
        >
          <Music className="inline-block mr-2 h-7 w-7 " /> Musica
        </Link>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
        <nav
          className={`absolute inset-x-0 top-full bg-white text-gray-800 flex flex-col md:static md:flex md:flex-row md:bg-transparent md:text-white ${
            menuOpen ? "flex" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-6 p-4 md:p-0">
            {/* User Icon - Mobile */}
            {isLogin && userIcon && (
              <li className="md:hidden border-b border-gray-300 pb-3 mb-3">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 transition"
                >
                  {userIcon.startsWith('@static/') ? (
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <User className="h-10 w-10 text-gray-600" />
                    </div>
                  ) : (
                    <Image
                      src={userIcon}
                      alt="User Avatar"
                      className="h-10 w-10 rounded-full object-cover"
                      width={40}
                      height={40}
                    />
                  )}
                  <span className="font-medium text-gray-900">Profile</span>
                </button>
              </li>
            )}
            
            <li className="md:hidden">
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition"
              >
                <Info className="h-4 w-4" />
                About
              </Link>
            </li>
            {isLogin ? (
              <>
                <li className="hidden md:block">
                  <Link
                    href="/about"
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition"
                  >
                    <Info className="h-4 w-4" />
                    About
                  </Link>
                </li>
                <li>
                  <Sheet open={postModalOpen} onOpenChange={setPostModalOpen}>
                    <SheetTrigger asChild>
                      <button
                        type="button"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition"
                      >
                        <PlusCircle className="h-4 w-4" />
                        Post
                      </button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-md">
                      <SheetHeader>
                        <SheetTitle>Create New Post</SheetTitle>
                      </SheetHeader>
                      <form onSubmit={handlePostSubmit} className="space-y-4 mt-6">
                        <div className="space-y-2">
                          <Label htmlFor="postTitle">Title</Label>
                          <Input
                            id="postTitle"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                            placeholder="Enter post title..."
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postContent">Content</Label>
                          <textarea
                            id="postContent"
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full min-h-[120px] px-3 py-2 border border-input rounded-md bg-transparent text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring resize-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="musicUrl">Music URL</Label>
                          <Input
                            id="musicUrl"
                            type="url"
                            value={musicUrl}
                            onChange={(e) => setMusicUrl(e.target.value)}
                            placeholder="https://example.com/music.mp3"
                            required
                          />
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button 
                            type="submit" 
                            className="flex-1"
                            disabled={!postTitle.trim() || !postContent.trim() || !musicUrl.trim() || isSubmitting}
                          >
                            {isSubmitting ? "Posting..." : "Post"}
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setPostModalOpen(false)}
                            disabled={isSubmitting}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </SheetContent>
                  </Sheet>
                </li>
                <li>
                  <Link
                    href="/logout"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Link>
                </li>
                {/* User Icon - Desktop */}
                {userIcon && (
                  <li className="hidden md:flex md:items-center">
                    <div className="flex items-center px-3 py-2">
                      {userIcon.startsWith('@static/') ? (
                        <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
                          <User className="h-14 w-14" />
                        </div>
                      ) : (
                        <Image
                          src={userIcon}
                          alt="User Avatar"
                          className="h-14 w-14 rounded-full object-cover border-2 border-white/20"
                          width={80}
                          height={80}
                        />
                      )}
                    </div>
                  </li>
                )}
              </>
            ) : (
              <>
                <li className="hidden md:block">
                  <Link
                    href="/about"
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition"
                  >
                    <Info className="h-4 w-4" />
                    About
                  </Link>
                </li>
                <li>
                  <div className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition">
                    <LogIn className="h-4 w-4" />
                    <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                  </div>
                </li>
                <li>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition"
                  >
                    <UserPlus className="h-4 w-4" />
                    SignUp
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
