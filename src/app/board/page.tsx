'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Pencil, Heart, Eye } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import BottomNav from '@/components/BottomNav';
import { useStore } from '@/store';

const BF = ['전체','생활정보','맛집추천','육아/교육','이민/비자','분실/습득'];

export default function BoardPage() {
  const [active, setActive] = useState('전체');
  const { posts, likePost } = useStore();
  const router = useRouter();
  const items = posts.filter(p=>p.category==='board');
  return (
    <div className="app-shell">
      <AppHeader/>
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-white">
        <div className="flex items-center gap-2 flex-1 rounded-full px-3.5 py-2" style={{background:'#F5ECD7'}}>
          <Search size={15} color="#A05C2C"/>
          <input className="flex-1 text-[13px] outline-none border-none" style={{background:'none',color:'#6B3F1F',fontFamily:'inherit'}} placeholder="게시글 검색..."/>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-3.5 py-2 bg-white border-b border-[#EDE0C8]">
        {BF.map(f=>(
          <button key={f} onClick={()=>setActive(f)} className="chip" style={{background:active===f?'#6B3F1F':'#F0EAE0',color:active===f?'#FAF0D0':'#A05C2C',border:'none',cursor:'pointer'}}>{f}</button>
        ))}
      </div>
      <main className="page-content">
        {items.map(p=>(
          <div key={p.id} className="dotori-card cursor-pointer p-3.5" onClick={()=>router.push(`/post/${p.id}`)}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[16px] shrink-0 bg-[#F5ECD7]">{p.emoji}</div>
              <div>
                <p className="text-[12px] font-semibold text-gray-800">{p.author}</p>
                <p className="text-[11px] text-gray-400">{p.location} · {p.timeAgo}</p>
              </div>
            </div>
            <p className="text-[13px] text-gray-700 leading-relaxed line-clamp-3">{p.description}</p>
            <div className="flex gap-4 mt-2.5">
              <button className="flex items-center gap-1" onClick={e=>{e.stopPropagation();likePost(p.id);}}>
                <Heart size={14} fill={p.liked?'#C0392B':'none'} color={p.liked?'#C0392B':'#aaa'}/>
                <span className="text-[11px] text-gray-400">{p.likes}</span>
              </button>
              <div className="flex items-center gap-1"><Eye size={14} color="#aaa"/><span className="text-[11px] text-gray-400">{p.views}</span></div>
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
