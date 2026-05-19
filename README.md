# 🌰 도토리야 (Dotoriya) — Web App

**미국 한인 커뮤니티 PWA** — Next.js 14 + Tailwind + Zustand + GitHub Pages

[![Deploy](https://github.com/your-username/dotoriya/actions/workflows/deploy.yml/badge.svg)](https://github.com/your-username/dotoriya/actions)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![PWA](https://img.shields.io/badge/PWA-ready-purple)](https://web.dev/progressive-web-apps/)

🌐 **라이브 데모**: `https://your-username.github.io/dotoriya`

---

## 🚀 GitHub 배포 5분 설정

### 1. 레포 생성 & 코드 푸시

```bash
git init && git add . && git commit -m "🌰 도토리야 초기 커밋"
gh repo create dotoriya --public --push --source=.
```

### 2. GitHub Pages 활성화

```
GitHub 레포 → Settings → Pages
→ Source: GitHub Actions 선택
→ 저장
```

### 3. `main` 에 푸시하면 자동 배포!

```bash
git push origin main
# GitHub Actions가 자동으로 빌드 → 배포
# https://your-username.github.io/dotoriya 에서 확인
```

---

## 💻 로컬 개발

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## 📁 프로젝트 구조

```
dotoriya/
├── .github/workflows/deploy.yml  # 자동 빌드 + GitHub Pages 배포
├── src/
│   ├── app/
│   │   ├── layout.tsx            # 폰트 + PWA 메타태그
│   │   ├── page.tsx              # 앱 쉘 (라우팅)
│   │   └── globals.css           # 글로벌 스타일
│   ├── components/
│   │   ├── SquirrelLogo.tsx      # 애니메이션 다람쥐 SVG
│   │   ├── AppHeader.tsx         # 헤더 + 동네 설정 모달
│   │   ├── NavTabs.tsx           # 상단 탭 + 하단 네비게이션
│   │   ├── PostCard.tsx          # 게시물 카드
│   │   └── Screens.tsx           # 전체 화면 컴포넌트
│   └── store/index.ts            # Zustand 상태관리
├── public/manifest.json          # PWA 매니페스트
├── next.config.js                # Next.js + PWA 설정
└── tailwind.config.ts            # 도토리야 디자인 토큰
```

---

## 🛠️ 기술 스택

| 기술 | 역할 |
|------|------|
| **Next.js 14** (App Router) | 웹 프레임워크, 정적 빌드 |
| **Tailwind CSS** | 스타일링 |
| **Zustand + persist** | 전역 상태 + 로컬 저장 |
| **next-pwa** | PWA (오프라인, 홈화면 추가) |
| **GitHub Actions** | CI + GitHub Pages 자동 배포 |

---

## 📱 PWA 설치 방법

**iPhone Safari**: 공유 버튼 → "홈 화면에 추가"
**Android Chrome**: 주소창 → "앱 설치"

---

## 🗺️ 로드맵

- [x] PWA 웹앱 (현재)
- [ ] Supabase 백엔드 (DB + Auth + 실시간 채팅)
- [ ] 이미지 업로드 (Supabase Storage)
- [ ] 푸시 알림 (Web Push)
- [ ] React Native 앱 전환

---

## 📄 라이선스

MIT License — © 2025 도토리야
