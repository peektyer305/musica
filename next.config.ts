import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // YouTube domains
      new URL('https://img.youtube.com/**'),
      new URL('https://i.ytimg.com/**'),
      new URL('https://yt3.ggpht.com/**'),
      // Spotify domains
      new URL('https://i.scdn.co/**'),
      new URL('https://mosaic.scdn.co/**'),
      new URL('https://lineup-images.scdn.co/**'),
      // SoundCloud domains
      new URL('https://i1.sndcdn.com/**'),
      new URL('https://a1.sndcdn.com/**'),
      new URL('https://waveforms.sndcdn.com/**'),
      // Supabase storage (for user icons)
      new URL('https://usiayvyiamxmztdfwegd.supabase.co/storage/v1/object/public/**'),
      // GitHub avatars
      new URL('https://avatars.githubusercontent.com/**'),
    ],
  },
};

export default nextConfig;
