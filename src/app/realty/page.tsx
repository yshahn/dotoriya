'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Pencil, Eye } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import BottomNav from '@/components/BottomNav';
import { useStore } from '@/store';

const RF = ['전체','렌트','매매','룸메이트','상가/비즈'];

export default function RealtyPage() {
  const [active, setActive] = useState('전체');
  const { posts } = useStore();
  const router = useRouter();
  const items = posts.filter(p=>p.category==='realty');
  const typeColor: Record<string,string> = {'렌트':'bg-[#E0EAF5] text-[#1A5FA8]','매매':'bg-[#FCF0E0] text-[#C05A10]','룸메이트':'bg-[#F5ECD7] text-[#A05C2C]'};
  return (
    <div className="app-shell">
      <AppHeader/>
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-white">
        <div className="flex items-center gap-2 flex-1 rounded-full px-3.5 py-2" style={{background:'#F5ECD7'}}>
          <Search size={15} color="#A05C2C"/>
          <input className="flex-1 text-[13px] outline-none border-none" style={{background:'none',color:'#6B3F1F',fontFamily:'inherit'}} placeholder="지역, 가격, 타입 검색..."/>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-3.5 py-2 bg-white border-b border-[#EDE0C8]">
        {RF.map(f=>(
          <button key={f} onClick={()=>setActive(f)} className="chip" style={{background:active===f?'#1A5FA8':'#E0EAF5',color:active===f?'white':'#1A5FA8',border:'none',cursor:'pointer'}}>{f}</button>
        ))}
      </div>
      <main className="page-content">
        {items.map(p=>{
          const type = p.tags[0]||'렌트';
          return (
            <div key={p.id} className="dotori-card cursor-pointer overflow-hidden" onClick={()=>router.push(`/post/${p.id}`)}>
              <div className="h-20 flex items-center justify-center text-[40px] bg-[#E0EAF5]">{p.emoji}</div>
              <div className="p-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-gray-900 mb-0.5">{p.title}</p>
                    <p className="text-[11px] text-gray-400 mb-1.5">{p.location}</p>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ml-2 shrink-0 ${typeColor[type]||'bg-[#E0EAF5] text-[#1A5FA8]'}`}>{type}</span>
                </div>
                <p className="text-[15px] font-bold text-[#1A5FA8]">{p.price}</p>
              </div>
              <div className="flex justify-between items-center px-3.5 py-2 border-t border-[#F0E8D8]">
                <div className="flex items-center gap-1"><Eye size={12} color="#aaa"/><span className="text-[11px] text-gray-400">{p.views}</span></div>
                <span className="text-[11px] text-gray-400">{p.timeAgo}</span>
              </div>
            </div>
          );
        })}
        <div className="h-6"/>
      </main>
      <button onClick={()=>router.push('/write')} className="fixed z-40 w-[50px] h-[50px] rounded-full flex items-center justify-center" style={{bottom:80,right:'calc(50% - 215px + 16px)',background:'#6B3F1F',boxShadow:'0 4px 14px rgba(107,63,31,.4)',border:'none',cursor:'pointer'}}>
        <Pencil size={22} color="#FAF0D0"/>
      </button>
      <BottomNav/>
    </div>
  );
}
