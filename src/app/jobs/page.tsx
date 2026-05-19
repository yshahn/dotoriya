'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Pencil } from 'lucide-react';
import { Eye } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import BottomNav from '@/components/BottomNav';
import { useStore } from '@/store';

const JF = ['전체','식당/카페','뷰티/네일','IT/사무직','교육/튜터','구직'];

export default function JobsPage() {
  const [active, setActive] = useState('전체');
  const { posts } = useStore();
  const router = useRouter();
  const items = posts.filter(p=>p.category==='jobs');
  return (
    <div className="app-shell">
      <AppHeader/>
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-white">
        <div className="flex items-center gap-2 flex-1 rounded-full px-3.5 py-2" style={{background:'#F5ECD7'}}>
          <Search size={15} color="#A05C2C"/>
          <input className="flex-1 text-[13px] outline-none border-none" style={{background:'none',color:'#6B3F1F',fontFamily:'inherit'}} placeholder="직종, 업체명 검색..."/>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-3.5 py-2 bg-white border-b border-[#EDE0C8]">
        {JF.map(f=>(
          <button key={f} onClick={()=>setActive(f)} className="chip" style={{background:active===f?'#3D6B3A':'#E6F0E6',color:active===f?'white':'#3D6B3A',border:'none',cursor:'pointer'}}>{f}</button>
        ))}
      </div>
      <main className="page-content">
        {items.map(p=>(
          <div key={p.id} className="dotori-card cursor-pointer p-3.5" onClick={()=>router.push(`/post/${p.id}`)}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-gray-900 mb-0.5">{p.title}</p>
                <p className="text-[11px] text-gray-400">{p.author} · {p.location}</p>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ml-2 shrink-0 ${p.tags.includes('구인')?'bg-[#E6F0E6] text-[#3D6B3A]':'bg-[#E0EAF5] text-[#1A5FA8]'}`}>
                {p.tags.includes('구인')?'구인':'구직'}
              </span>
            </div>
            <p className="text-[12px] text-gray-600 leading-relaxed whitespace-pre-line">{p.description}</p>
            <div className="flex items-center gap-1 mt-2">
              <Eye size={12} color="#aaa"/>
              <span className="text-[11px] text-gray-400">{p.views}</span>
              <span className="text-[11px] text-gray-400 ml-3">{p.timeAgo}</span>
            </div>
          </div>
        ))}
        <div className="h-6"/>
      </main>
      <button onClick={()=>router.push('/write')} className="fixed z-40 w-[50px] h-[50px] rounded-full flex items-center justify-center" style={{bottom:80,right:'calc(50% - 215px + 16px)',background:'#6B3F1F',boxShadow:'0 4px 14px rgba(107,63,31,.4)',border:'none',cursor:'pointer'}}>
        <Pencil size={22} color="#FAF0D0"/>
      </button>
      <BottomNav/>
    </div>
  );
}
