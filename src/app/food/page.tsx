'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Pencil } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import BottomNav from '@/components/BottomNav';
import { JobCard, RealtyCard, BoardCard } from '@/components/PostCard';
import { useStore } from '@/store';

const FF = ['전체','반찬류','김치류','도시락','간식/떡','국/찌개'];
const JF = ['전체','식당/카페','뷰티/네일','IT/사무직','교육/튜터','구직'];
const RF = ['전체','렌트','매매','룸메이트','상가/비즈'];
const BF = ['전체','생활정보','맛집추천','육아/교육','이민/비자','분실/습득'];

function FilterBar({ filters, active, setActive, accent }: { filters:string[]; active:string; setActive:(s:string)=>void; accent:string }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar px-3.5 py-2 bg-white border-b border-[#EDE0C8]">
      {filters.map(f=>(
        <button key={f} onClick={()=>setActive(f)} className="chip" style={{background:active===f?accent:'#F0EAE0',color:active===f?'white':'#A05C2C',border:'none',cursor:'pointer'}}>{f}</button>
      ))}
    </div>
  );
}
function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex items-center gap-2 px-3.5 py-2.5 bg-white">
      <div className="flex items-center gap-2 flex-1 rounded-full px-3.5 py-2" style={{background:'#F5ECD7'}}>
        <Search size={15} color="#A05C2C"/>
        <input className="flex-1 text-[13px] outline-none border-none" style={{background:'none',color:'#6B3F1F',fontFamily:'inherit'}} placeholder={placeholder}/>
      </div>
    </div>
  );
}

export function FoodPage() {
  const [active, setActive] = useState('전체');
  const { posts } = useStore();
  const items = posts.filter(p=>p.category==='food');
  return (
    <div className="app-shell">
      <AppHeader/>
      <SearchBar placeholder="반찬, 음식 검색..."/>
      <FilterBar filters={FF} active={active} setActive={setActive} accent="#C05A10"/>
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

export function JobsPage() {
  const [active, setActive] = useState('전체');
  const { posts } = useStore();
  const router = useRouter();
  const items = posts.filter(p=>p.category==='jobs');
  return (
    <div className="app-shell">
      <AppHeader/>
      <SearchBar placeholder="직종, 업체명 검색..."/>
      <FilterBar filters={JF} active={active} setActive={setActive} accent="#3D6B3A"/>
      <main className="page-content">
        {items.map(p=><JobCard key={p.id} post={p}/>)}
        <div className="h-6"/>
      </main>
      <button onClick={()=>router.push('/write')} className="fixed z-40 w-[50px] h-[50px] rounded-full flex items-center justify-center" style={{bottom:80,right:'calc(50% - 215px + 16px)',background:'#6B3F1F',boxShadow:'0 4px 14px rgba(107,63,31,.4)',border:'none',cursor:'pointer'}}>
        <Pencil size={22} color="#FAF0D0"/>
      </button>
      <BottomNav/>
    </div>
  );
}

export function RealtyPage() {
  const [active, setActive] = useState('전체');
  const { posts } = useStore();
  const router = useRouter();
  const items = posts.filter(p=>p.category==='realty');
  return (
    <div className="app-shell">
      <AppHeader/>
      <SearchBar placeholder="지역, 가격, 타입 검색..."/>
      <FilterBar filters={RF} active={active} setActive={setActive} accent="#1A5FA8"/>
      <main className="page-content">
        {items.map(p=><RealtyCard key={p.id} post={p}/>)}
        <div className="h-6"/>
      </main>
      <button onClick={()=>router.push('/write')} className="fixed z-40 w-[50px] h-[50px] rounded-full flex items-center justify-center" style={{bottom:80,right:'calc(50% - 215px + 16px)',background:'#6B3F1F',boxShadow:'0 4px 14px rgba(107,63,31,.4)',border:'none',cursor:'pointer'}}>
        <Pencil size={22} color="#FAF0D0"/>
      </button>
      <BottomNav/>
    </div>
  );
}

export function BoardPage() {
  const [active, setActive] = useState('전체');
  const { posts } = useStore();
  const router = useRouter();
  const items = posts.filter(p=>p.category==='board');
  return (
    <div className="app-shell">
      <AppHeader/>
      <SearchBar placeholder="게시글 검색..."/>
      <FilterBar filters={BF} active={active} setActive={setActive} accent="#6B3F1F"/>
      <main className="page-content">
        {items.map(p=><BoardCard key={p.id} post={p}/>)}
        <div className="h-6"/>
      </main>
      <button onClick={()=>router.push('/write')} className="fixed z-40 w-[50px] h-[50px] rounded-full flex items-center justify-center" style={{bottom:80,right:'calc(50% - 215px + 16px)',background:'#6B3F1F',boxShadow:'0 4px 14px rgba(107,63,31,.4)',border:'none',cursor:'pointer'}}>
        <Pencil size={22} color="#FAF0D0"/>
      </button>
      <BottomNav/>
    </div>
  );
}

export default FoodPage;
