'use client';
// src/components/NavTabs.tsx
import { ShoppingBag, Home, Coffee, MessageSquare, User, Briefcase, Building } from 'lucide-react';
import { useStore, TabId } from '@/store';

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'home',   label: '홈',       icon: <Home size={13} /> },
  { id: 'market', label: '중고장터', icon: <ShoppingBag size={13} /> },
  { id: 'food',   label: '홈메이드', icon: <Coffee size={13} /> },
  { id: 'jobs',   label: '구인구직', icon: <Briefcase size={13} /> },
  { id: 'realty', label: '부동산',   icon: <Building size={13} /> },
  { id: 'board',  label: '자유게시판', icon: <MessageSquare size={13} /> },
];

export function NavTabs() {
  const { activeTab, setActiveTab } = useStore();
  return (
    <div className="flex overflow-x-auto bg-white border-b border-[#EDE0C8] chips-scroll flex-shrink-0">
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => setActiveTab(t.id)}
          className={`flex-shrink-0 flex items-center gap-1 px-3.5 py-2.5 text-[11.5px] font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === t.id
              ? 'text-dotori-brown border-dotori-brown font-bold'
              : 'text-gray-400 border-transparent'
          }`}
        >
          {t.icon}{t.label}
        </button>
      ))}
    </div>
  );
}

const BNAV = [
  { id: 'home'   as TabId, label: '홈',      icon: <Home size={22} /> },
  { id: 'market' as TabId, label: '중고장터', icon: <ShoppingBag size={22} /> },
  { id: 'food'   as TabId, label: '홈메이드', icon: <Coffee size={22} /> },
  { id: 'board'  as TabId, label: '게시판',  icon: <MessageSquare size={22} /> },
];

export function BottomNav() {
  const { activeTab, setActiveTab, activePage, setActivePage } = useStore();
  return (
    <nav className="flex bg-white border-t border-[#EDE0C8] safe-bottom flex-shrink-0">
      {BNAV.map((b) => (
        <button key={b.id} onClick={() => setActiveTab(b.id)}
          className={`flex-1 flex flex-col items-center py-2 gap-0.5 text-[10px] transition-colors ${
            activePage === 'main' && activeTab === b.id ? 'text-dotori-brown' : 'text-gray-300'
          }`}>
          {b.icon}{b.label}
        </button>
      ))}
      <button onClick={() => setActivePage('profile')}
        className={`flex-1 flex flex-col items-center py-2 gap-0.5 text-[10px] transition-colors ${
          activePage === 'profile' ? 'text-dotori-brown' : 'text-gray-300'
        }`}>
        <User size={22} />마이
      </button>
    </nav>
  );
}
