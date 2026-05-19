'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import BottomNav from '@/components/BottomNav';
import { useStore } from '@/store';

const FF = ['전체','반찬류','김치류','도시락','간식/떡','국/찌개'];

export default function FoodPage() {
  const [active, setActive] = useState('전체');
  const { posts } = useStore();
  const items = posts.filter(p=>p.category==='food');
  return (
    <div className="app-shell">
      <AppHeader/>
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-white">
        <div className="flex items-center gap-2 flex-1 rounded-full px-3.5 py-2" style={{background:'#F5ECD7'}}>
          <Search size={15} color="#A05C2C"/>
          <input className="flex-1 text-[13px] outline-none border-none" style={{background:'none',color:'#6B3F1F',fontFamily:'inherit'}} placeholder="반찬, 음식 검색..."/>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-3.5 py-2 bg-white border-b border-[#EDE0C8]">
        {FF.map(f=>(
          <button key={f} onClick={()=>setActive(f)} className="chip" style={{background:active===f?'#C05A10':'#F0EAE0',color:active===f?'white':'#A05C2C',border:'none',cursor:'pointer'}}>{f}</button>
        ))}
      </div>
      <div className="text-[11px] text-gray-400 px-3.5 py-2 bg-white">🌟 이웃이 직접 만든 음식을 주문해 보세요</div>
      <main className="page-content">
        {items.map(p=>(
          <div key={p.id} className="dotori-card flex gap-3 p-3">
            <div className="w-[60px] h-[60px] rounded-[10px] flex items-center justify-center text-[28px] shrink-0" style={{background:'#FCF0E0'}}>{p.emoji}</div>
            <div className="flex-1">
              <p className="text-[13px] font-bold text-gray-900 mb-0.5">{p.title}</p>
              <p className="text-[11px] text-gray-400 mb-1.5">{p.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-[15px] font-bold" style={{color:'#C05A10'}}>{p.price}</span>
                <button className="text-white text-[11px] font-bold px-3 py-1.5 rounded-[8px]" style={{background:'#C05A10',border:'none',cursor:'pointer'}}>주문하기</button>
              </div>
            </div>
          </div>
        ))}
        <div className="h-6"/>
      </main>
      <BottomNav/>
    </div>
  );
}
