/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // AVIF first: at a given quality it holds detail that WebP smooths away —
    // which matters here, because the source photography is small enough that
    // it is displayed above its native size and has no detail to spare.
    formats: ["image/avif", "image/webp"],
    // 75 is Next's default; 90 is what the photography is served at.
    qualities: [75, 90],
  },
};

export default nextConfig;
