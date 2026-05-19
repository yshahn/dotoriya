// src/components/BottomNav.tsx
'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Home, ShoppingBag, Coffee, MessageSquare, User } from 'lucide-react';

const TABS = [
  { href: '/',      icon: Home,          label: '홈' },
  { href: '/market',icon: ShoppingBag,   label: '중고장터' },
  { href: '/food',  icon: Coffee,        label: '홈메이드' },
  { href: '/board', icon: MessageSquare, label: '게시판' },
  { href: '/profile',icon: User,         label: '마이' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <nav className="bottom-nav">
      {TABS.map(({ href, icon: Icon, label }) => {
        const active = pathname === href;
        return (
          <button
            key={href}
            onClick={() => router.push(href)}
            className="flex flex-col items-center justify-center flex-1 gap-[3px] py-2"
            style={{ color: active ? '#6B3F1F' : '#bbb', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Icon size={21} strokeWidth={active ? 2.5 : 1.8} />
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 400 }}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
