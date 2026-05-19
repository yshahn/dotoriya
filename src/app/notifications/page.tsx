'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useStore } from '@/store';

export default function NotificationsPage() {
  const router = useRouter();
  const { notifications, markAllRead } = useStore();
  useEffect(()=>{ markAllRead(); },[]);
  const unread = notifications.filter(n=>n.unread);
  const read   = notifications.filter(n=>!n.unread);

  return (
    <div className="app-shell">
      <div className="px-4 pt-3 pb-3 flex items-center gap-3" style={{background:'#6B3F1F'}}>
        <button onClick={()=>router.back()} style={{background:'none',border:'none',cursor:'pointer'}}><ArrowLeft size={22} color="#FAF0D0"/></button>
        <span className="font-display text-[15px]" style={{color:'#FAF0D0'}}>알림</span>
      </div>
      {unread.length>0 && <p className="text-[11px] font-semibold px-4 py-2.5" style={{color:'#A05C2C'}}>새 알림</p>}
      {notifications.map(n=>(
        <div key={n.id} className="flex items-start gap-3 px-4 py-3 border-b border-[#F0E8D8]" style={{background:n.unread?'#FEF8F0':'white'}}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-[18px] shrink-0" style={{background:n.iconBg}}>{n.icon}</div>
          <div className="flex-1">
            <p className="text-[12px] font-semibold text-gray-900 mb-0.5">{n.title}</p>
            <p className="text-[11px] text-gray-600 leading-relaxed">{n.description}</p>
            <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
