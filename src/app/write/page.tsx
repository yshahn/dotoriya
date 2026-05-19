'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useStore, type Category } from '@/store';

const CATS: { label:string; val:Category }[] = [
  {label:'중고장터',val:'market'},{label:'홈메이드',val:'food'},
  {label:'구인구직',val:'jobs'},{label:'부동산',val:'realty'},{label:'자유게시판',val:'board'},
];
const DEAL = ['직거래','택배거래','픽업'];
const EMOJIS: Record<string,string> = {market:'📦',food:'🍱',jobs:'💼',realty:'🏠',board:'💬'};

export default function WritePage() {
  const router = useRouter();
  const { addPost } = useStore();
  const [cat, setCat] = useState<Category>('market');
  const [deal, setDeal] = useState('직거래');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');

  function submit() {
    if (!title.trim()) return;
    addPost({ category:cat, title, price, description:desc, location:'Duluth', timeAgo:'방금 전', tags:[], emoji:EMOJIS[cat], author:'김도토리' });
    router.back();
  }

  return (
    <div className="app-shell">
      <div className="px-4 pt-3 pb-3 flex items-center justify-between" style={{background:'#6B3F1F'}}>
        <div className="flex items-center gap-3">
          <button onClick={()=>router.back()} style={{background:'none',border:'none',cursor:'pointer'}}><X size={22} color="#FAF0D0"/></button>
          <span className="font-display text-[15px]" style={{color:'#FAF0D0'}}>글쓰기</span>
        </div>
        <button onClick={submit} className="text-[12px] font-bold px-4 py-1.5 rounded-full" style={{background:'#D4A96A',color:'#6B3F1F',border:'none',cursor:'pointer'}}>등록</button>
      </div>

      <div className="page-content p-4 flex flex-col gap-3">
        {/* Category */}
        <p className="text-[12px] font-bold" style={{color:'#6B3F1F'}}>카테고리</p>
        <div className="flex gap-2 flex-wrap">
          {CATS.map(c=>(
            <button key={c.val} onClick={()=>setCat(c.val)} className="px-3.5 py-1.5 rounded-full text-[12px] border" style={{background:cat===c.val?'#6B3F1F':'white',color:cat===c.val?'#FAF0D0':'#666',borderColor:cat===c.val?'#6B3F1F':'#EDE0C8',cursor:'pointer'}}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Photo */}
        <p className="text-[12px] font-bold" style={{color:'#6B3F1F'}}>사진 첨부</p>
        <div className="w-[68px] h-[68px] rounded-[10px] flex flex-col items-center justify-center gap-1 text-[11px] border-2 border-dashed cursor-pointer" style={{borderColor:'#D4A96A',color:'#A05C2C'}}>
          <span className="text-[22px]">📷</span><span>사진추가</span>
        </div>

        <p className="text-[12px] font-bold" style={{color:'#6B3F1F'}}>제목</p>
        <input value={title} onChange={e=>setTitle(e.target.value)} className="dotori-input" placeholder="제목을 입력하세요"/>

        <p className="text-[12px] font-bold" style={{color:'#6B3F1F'}}>가격</p>
        <input value={price} onChange={e=>setPrice(e.target.value)} className="dotori-input" placeholder="가격 입력 (예: $50, 무료나눔)"/>

        <p className="text-[12px] font-bold" style={{color:'#6B3F1F'}}>내용</p>
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} className="dotori-input" style={{resize:'none',height:90,lineHeight:1.6}} placeholder="내용을 입력해 주세요. 물품 상태, 구입시기 등을 자세히 적으면 거래가 빨라요 😊"/>

        <p className="text-[12px] font-bold" style={{color:'#6B3F1F'}}>거래 방법</p>
        <div className="flex gap-2">
          {DEAL.map(d=>(
            <button key={d} onClick={()=>setDeal(d)} className="px-3.5 py-1.5 rounded-full text-[12px] border" style={{background:deal===d?'#6B3F1F':'white',color:deal===d?'#FAF0D0':'#666',borderColor:deal===d?'#6B3F1F':'#EDE0C8',cursor:'pointer'}}>
              {d}
            </button>
          ))}
        </div>

        <button onClick={submit} className="w-full py-3.5 rounded-[12px] text-[14px] mt-1 font-display" style={{background:'#6B3F1F',color:'#FAF0D0',border:'none',cursor:'pointer'}}>
          🌰 글 등록하기
        </button>
      </div>
    </div>
  );
}
