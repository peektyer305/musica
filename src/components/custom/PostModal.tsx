"use client";
import { useState } from "react";
import { PlusCircle, FileText, Music2, Link as LinkIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PostModalProps = {
  onMenuClose: () => void;
};

export default function PostModal({ onMenuClose }: PostModalProps) {
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [musicUrl, setMusicUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <Sheet open={postModalOpen} onOpenChange={setPostModalOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          onClick={onMenuClose}
          className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition"
        >
          <PlusCircle className="h-4 w-4" />
          Post
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-gradient-to-br from-purple-50 to-indigo-50 border-l-4 border-purple-500">
        <SheetHeader className="space-y-3 pb-6 border-b border-purple-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-full">
              <PlusCircle className="h-6 w-6 text-purple-600" />
            </div>
            <SheetTitle className="text-2xl font-bold text-gray-800">Create New Post</SheetTitle>
          </div>
          <p className="text-gray-600 text-sm">Share your music and thoughts with the community</p>
        </SheetHeader>
        <form onSubmit={handlePostSubmit} className="space-y-6 mt-8">
          <div className="space-y-3">
            <Label htmlFor="postTitle" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText className="h-4 w-4 text-purple-600" />
              Title
            </Label>
            <Input
              id="postTitle"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Give your post a catchy title..."
              className="border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-400 bg-white shadow-sm"
              required
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="postContent" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText className="h-4 w-4 text-purple-600" />
              Content
            </Label>
            <textarea
              id="postContent"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Share your thoughts, feelings, or story about this music..."
              className="w-full min-h-[140px] px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:border-purple-400 resize-none"
              required
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="musicUrl" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Music2 className="h-4 w-4 text-purple-600" />
              Music URL
            </Label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="musicUrl"
                type="url"
                value={musicUrl}
                onChange={(e) => setMusicUrl(e.target.value)}
                placeholder="https://soundcloud.com/your-track or https://spotify.com/..."
                className="pl-10 border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-400 bg-white shadow-sm"
                required
              />
            </div>
            <p className="text-xs text-gray-500">Paste a link to your music from SoundCloud, Spotify, YouTube, etc.</p>
          </div>
          <div className="flex gap-3 pt-6 border-t border-purple-200">
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={!postTitle.trim() || !postContent.trim() || !musicUrl.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Posting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Create Post
                </div>
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setPostModalOpen(false)}
              disabled={isSubmitting}
              className="px-6 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}