import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // YouTube domains
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com',
        pathname: '/**',
      },
      // Spotify domains
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lineup-images.scdn.co',
        pathname: '/**',
      },
      // SoundCloud domains
      {
        protocol: 'https',
        hostname: 'i1.sndcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'a1.sndcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'waveforms.sndcdn.com',
        pathname: '/**',
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
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
