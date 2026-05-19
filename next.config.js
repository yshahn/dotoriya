/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // GitHub Pages 배포 시 레포 이름으로 basePath 설정
  // 예: https://username.github.io/dotoriya → basePath: '/dotoriya'
  // 커스텀 도메인 사용 시 아래 줄 제거
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

module.exports = nextConfig;
