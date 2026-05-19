'use client';
import { useRouter } from 'next/navigation';
import AppHeader from '@/components/AppHeader';
import BottomNav from '@/components/BottomNav';
import { PostCard, BoardCard } from '@/components/PostCard';
import { useStore } from '@/store';
import { Pencil } from 'lucide-react';

const CATS = [
  { label:'중고장터', emoji:'📦', bg:'#F5ECD7', href:'/market' },
  { label:'홈메이드', emoji:'🍱', bg:'#FCF0E0', href:'/food' },
  { label:'구인구직', emoji:'💼', bg:'#E6F0E6', href:'/jobs' },
  { label:'부동산',   emoji:'🏠', bg:'#E8EFF8', href:'/realty' },
];

export default function HomePage() {
  const router = useRouter();
  const { posts } = useStore();
  const marketPosts = posts.filter(p=>p.category==='market').slice(0,2);
  const foodPosts   = posts.filter(p=>p.category==='food').slice(0,1);
  const boardPosts  = posts.filter(p=>p.category==='board').slice(0,2);

  return (
    <div className="app-shell">
      <AppHeader/>
      <main className="page-content">
        <div className="grid grid-cols-4 gap-2 px-3.5 py-3">
          {CATS.map(c=>(
            <button key={c.href} onClick={()=>router.push(c.href)} className="flex flex-col items-center gap-1.5" style={{background:'none',border:'none',cursor:'pointer'}}>
              <div className="w-[52px] h-[52px] rounded-[15px] flex items-center justify-center text-[22px]" style={{background:c.bg}}>{c.emoji}</div>
              <span className="text-[10px] font-medium text-center leading-tight" style={{color:'#6B3F1F'}}>{c.label}</span>
            </button>
          ))}
        </div>

        <div className="mx-3.5 mb-2.5 rounded-[14px] flex justify-between items-center p-3.5" style={{background:'#6B3F1F'}}>
          <div>
            <p className="font-display text-[13px] mb-0.5" style={{color:'#FAF0D0'}}>🌰 이번 주 인기 글</p>
            <p className="text-[10px]" style={{color:'#D4A96A'}}>Duluth 지역 최다 관심 게시물</p>
          </div>
          <div className="rounded-[10px] px-3 py-1.5 text-center" style={{background:'rgba(255,255,255,0.18)'}}>
            <p className="font-display text-[18px]" style={{color:'#FAF0D0'}}>47</p>
            <p className="text-[10px]" style={{color:'#FAF0D0'}}>건</p>
          </div>
        </div>

        <div className="flex justify-between items-center px-3.5 pt-2.5 pb-2">
          <span className="text-[14px] font-bold" style={{color:'#6B3F1F'}}>🛒 최근 중고 매물</span>
          <button onClick={()=>router.push('/market')} className="text-[11px]" style={{color:'#A05C2C',background:'none',border:'none',cursor:'pointer'}}>더보기 →</button>
        </div>
        {marketPosts.map(p=><PostCard key={p.id} post={p}/>)}

        <div className="h-1.5 my-1" style={{background:'#F5ECD7'}}/>

        <div className="flex justify-between items-center px-3.5 pt-2.5 pb-2">
          <span className="text-[14px] font-bold" style={{color:'#6B3F1F'}}>🍱 오늘의 홈메이드</span>
          <button onClick={()=>router.push('/food')} className="text-[11px]" style={{color:'#A05C2C',background:'none',border:'none',cursor:'pointer'}}>더보기 →</button>
        </div>
        {foodPosts.map(p=>(
          <div key={p.id} className="dotori-card flex gap-3 p-3">
            <div className="w-[60px] h-[60px] rounded-[10px] flex items-center justify-center text-[28px] shrink-0" style={{background:'#FCF0E0'}}>{p.emoji}</div>
            <div className="flex-1">
              <p className="text-[13px] font-bold text-gray-900 mb-0.5">{p.title}</p>
              <p className="text-[11px] text-gray-400 mb-1.5">{p.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-[15px] font-bold" style={{color:'#C05A10'}}>{p.price}</span>
                <button className="text-white text-[11px] font-bold px-3 py-1.5 rounded-[8px]" style={{background:'#C05A10'}}>주문하기</button>
              </div>
            </div>
          </div>
        ))}

        <div className="h-1.5 my-1" style={{background:'#F5ECD7'}}/>

        <div className="flex justify-between items-center px-3.5 pt-2.5 pb-2">
          <span className="text-[14px] font-bold" style={{color:'#6B3F1F'}}>💬 자유게시판 인기글</span>
          <button onClick={()=>router.push('/board')} className="text-[11px]" style={{color:'#A05C2C',background:'none',border:'none',cursor:'pointer'}}>더보기 →</button>
        </div>
        {boardPosts.map(p=><BoardCard key={p.id} post={p}/>)}
        <div className="h-6"/>
      </main>

      <button
        onClick={()=>router.push('/write')}
        className="fixed z-40 w-[50px] h-[50px] rounded-full flex items-center justify-center"
        style={{bottom:80,right:'calc(50% - 215px + 16px)',background:'#6B3F1F',boxShadow:'0 4px 14px rgba(107,63,31,.4)',border:'none',cursor:'pointer'}}
      >
        <Pencil size={22} color="#FAF0D0"/>
      </button>
      <BottomNav/>
    </div>
  );
}
