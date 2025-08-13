import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // YouTube domains
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com',
      },
      // Spotify domains
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'lineup-images.scdn.co',
      },
      // SoundCloud domains
      {
        protocol: 'https',
        hostname: 'i1.sndcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'a1.sndcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'waveforms.sndcdn.com',
      },
      // Supabase storage (for user icons)
      {
        protocol: 'https',
        hostname: 'usiayvyiamxmztdfwegd.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      // GitHub avatars
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
