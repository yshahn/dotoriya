'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Pencil } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import BottomNav from '@/components/BottomNav';
import { PostCard } from '@/components/PostCard';
import { useStore } from '@/store';

const FILTERS = ['전체','가구/인테리어','전자기기','의류','유아동','무료나눔'];

export default function MarketPage() {
  const router = useRouter();
  const { posts } = useStore();
  const [active, setActive] = useState('전체');
  const items = posts.filter(p=>p.category==='market');

  return (
    <div className="app-shell">
      <AppHeader/>
      {/* Search */}
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-white">
        <div className="flex items-center gap-2 flex-1 rounded-full px-3.5 py-2" style={{background:'#F5ECD7'}}>
          <Search size={15} color="#A05C2C"/>
          <input className="flex-1 text-[13px] outline-none border-none" style={{background:'none',color:'#6B3F1F',fontFamily:'inherit'}} placeholder="중고 물품 검색..."/>
        </div>
      </div>
      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-3.5 py-2 bg-white border-b border-[#EDE0C8]">
        {FILTERS.map(f=>(
          <button key={f} onClick={()=>setActive(f)}
            className="chip"
            style={{background:active===f?'#6B3F1F':'#F0EAE0',color:active===f?'#FAF0D0':'#A05C2C',border:'none',cursor:'pointer'}}
          >{f}</button>
        ))}
      </div>
      <main className="page-content">
        {items.map(p=><PostCard key={p.id} post={p}/>)}
        <div className="h-6"/>
      </main>
      <button onClick={()=>router.push('/write')} className="fixed z-40 w-[50px] h-[50px] rounded-full flex items-center justify-center" style={{bottom:80,right:'calc(50% - 215px + 16px)',background:'#6B3F1F',boxShadow:'0 4px 14px rgba(107,63,31,.4)',border:'none',cursor:'pointer'}}>
        <Pencil size={22} color="#FAF0D0"/>
      </button>
      <BottomNav/>
    </div>
  );
}
