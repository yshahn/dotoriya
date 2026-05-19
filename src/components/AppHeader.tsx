// src/components/AppHeader.tsx
'use client';
import { useState } from 'react';
import { Bell, MessageCircle, MapPin, ChevronDown, Check } from 'lucide-react';
import { useStore } from '@/store';
import SquirrelLogo from './SquirrelLogo';
import { useRouter } from 'next/navigation';

const LOCATIONS = [
  'Atlanta, GA · Duluth 근처',
  'Atlanta, GA · Johns Creek 근처',
  'Atlanta, GA · Suwanee 근처',
  'Atlanta, GA · Alpharetta 근처',
  'Atlanta, GA · Norcross 근처',
];

export default function AppHeader() {
  const router = useRouter();
  const { location, setLocation, notifications } = useStore();
  const [open, setOpen] = useState(false);
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <>
      <header className="sticky top-0 z-40" style={{ background: '#6B3F1F' }}>
        {/* Logo row */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <div className="flex items-center gap-2">
            <SquirrelLogo size={52} />
            <div>
              <p className="font-display text-xl leading-tight" style={{ color: '#FAF0D0', letterSpacing: '1.5px' }}>도토리야</p>
              <p className="text-[9.5px]" style={{ color: '#D4A96A' }}>우리 동네 한인 커뮤니티</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => router.push('/notifications')}
              className="relative"
              aria-label="알림"
            >
              <Bell size={22} color="#FAF0D0" />
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-[#6B3F1F]">
                  {unread}
                </span>
              )}
            </button>
            <button onClick={() => router.push('/chat')} aria-label="채팅">
              <MessageCircle size={22} color="#FAF0D0" />
            </button>
          </div>
        </div>
        {/* Location bar */}
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center gap-2 px-4 py-[7px]"
          style={{ background: 'rgba(255,255,255,0.12)' }}
        >
          <MapPin size={13} color="#D4A96A" />
          <span className="text-[11.5px] flex-1 text-left" style={{ color: '#FAF0D0' }}>{location}</span>
          <ChevronDown size={13} color="#D4A96A" />
        </button>
      </header>

      {/* Location modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end"
          style={{ background: 'rgba(0,0,0,0.45)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-[430px] mx-auto bg-white rounded-t-2xl p-5 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-display text-base mb-4" style={{ color: '#6B3F1F' }}>🗺️ 동네 설정</p>
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => { setLocation(loc); setOpen(false); }}
                className="w-full flex items-center gap-3 py-3 border-b border-[#F0E8D8] text-left"
              >
                <MapPin size={16} color="#A05C2C" />
                <span className="flex-1 text-[13px]">{loc.replace('Atlanta, GA · ', '').replace(' 근처', '')}</span>
                {location === loc && <Check size={16} color="#6B3F1F" />}
              </button>
            ))}
            <button
              onClick={() => setOpen(false)}
              className="w-full mt-4 rounded-xl py-3 text-[13px] font-semibold"
              style={{ background: '#F5ECD7', color: '#6B3F1F' }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}
