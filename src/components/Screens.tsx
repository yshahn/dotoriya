'use client';
// src/components/Screens.tsx
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, X, Search, MapPin, Eye, Settings, ChevronRight, Package, ShoppingCart, Heart, MessageCircle, Coin, Bell } from 'lucide-react';
import { useStore, Post } from '@/store';
import PostCard, { BoardPostCard } from './PostCard';

// ── SearchBar ──────────────────────────────────────────────────────
function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex items-center gap-2 bg-white px-4 py-2.5 border-b border-[#EDE0C8]">
      <div className="flex items-center gap-2 bg-dotori-cream rounded-full px-3.5 py-2 flex-1">
        <Search size={15} className="text-dotori-light flex-shrink-0" />
        <input className="bg-transparent text-[13px] text-dotori-brown outline-none w-full placeholder:text-gray-400 font-noto" placeholder={placeholder} />
      </div>
    </div>
  );
}

// ── Chips ──────────────────────────────────────────────────────────
function Chips({ items, color = 'br' }: { items: string[]; color?: 'br'|'food'|'green'|'blue' }) {
  const [active, setActive] = useState(items[0]);
  const colorMap = { br: 'bg-dotori-brown text-dotori-logo', food: 'bg-food text-white', green: 'bg-job text-white', blue: 'bg-blue text-white' };
  const offMap = { br: 'bg-[#F0EAE0] text-dotori-light', food: 'bg-[#FCF0E0] text-food', green: 'bg-[#E6F0E6] text-job', blue: 'bg-[#E0EAF5] text-blue' };
  return (
    <div className="chips-scroll flex gap-1.5 px-3.5 py-2 bg-white border-b border-[#EDE0C8]">
      {items.map((f) => (
        <button key={f} onClick={() => setActive(f)}
          className={`flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${active === f ? colorMap[color] : offMap[color]}`}>
          {f}
        </button>
      ))}
    </div>
  );
}

// ── SubHeader ─────────────────────────────────────────────────────
function SubHeader({ title, onBack }: { title: string; onBack: () => void }) {
  const { setActivePage } = useStore();
  return (
    <div className="flex items-center gap-3 bg-dotori-brown px-4 py-3 safe-top">
      <button onClick={onBack} className="text-dotori-logo"><ArrowLeft size={20} /></button>
      <span className="font-dodum text-dotori-logo text-[15px] flex-1">{title}</span>
    </div>
  );
}

// ── HomeScreen ─────────────────────────────────────────────────────
export function HomeScreen() {
  const { posts, setActiveTab, setActivePage, setActivePostId } = useStore();
  const market = posts.filter((p) => p.category === 'market').slice(0, 2);
  const food   = posts.filter((p) => p.category === 'food').slice(0, 1)[0];
  const board  = posts.filter((p) => p.category === 'board').slice(0, 2);

  return (
    <div className="scroll-area flex-1 pb-4">
      {/* Category grid */}
      <div className="grid grid-cols-4 gap-2 px-3.5 py-3">
        {[['📦','중고장터','market'],['🍱','홈메이드','food'],['💼','구인구직','jobs'],['🏠','부동산','realty']].map(([e,l,t])=>(
          <button key={t} onClick={()=>setActiveTab(t as any)} className="flex flex-col items-center gap-1">
            <div className="w-[50px] h-[50px] rounded-2xl flex items-center justify-center text-[22px]" style={{background:t==='market'?'#F5ECD7':t==='food'?'#FCF0E0':t==='jobs'?'#E6F0E6':'#E8EFF8'}}>{e}</div>
            <span className="text-[10px] font-medium text-dotori-brown text-center leading-tight">{l}</span>
          </button>
        ))}
      </div>
      {/* Banner */}
      <div className="mx-3.5 mb-2.5 bg-dotori-brown rounded-card p-3.5 flex justify-between items-center">
        <div><p className="font-dodum text-dotori-logo text-[13px] mb-0.5">🌰 이번 주 인기 글</p><p className="text-dotori-tag text-[10px]">Duluth 지역 최다 관심 게시물</p></div>
        <div className="bg-white/15 rounded-xl px-2.5 py-1.5 text-center"><p className="font-dodum text-dotori-logo text-lg leading-none">47</p><p className="text-dotori-logo text-[10px]">건</p></div>
      </div>
      {/* Market */}
      <div className="flex justify-between items-center px-3.5 py-2.5"><span className="text-[14px] font-bold text-dotori-brown">🛒 최근 중고 매물</span><button onClick={()=>setActiveTab('market')} className="text-[11px] text-dotori-light">더보기 →</button></div>
      {market.map((p) => <PostCard key={p.id} post={p} compact />)}
      <div className="h-1.5 bg-dotori-cream my-1" />
      {/* Food */}
      <div className="flex justify-between items-center px-3.5 py-2.5"><span className="text-[14px] font-bold text-dotori-brown">🍱 오늘의 홈메이드</span><button onClick={()=>setActiveTab('food')} className="text-[11px] text-dotori-light">더보기 →</button></div>
      {food && (
        <div className="bg-white rounded-card mx-3.5 mb-2.5 border border-[#EDE0C8] p-3 flex gap-3 items-center">
          <div className="w-[60px] h-[60px] rounded-xl bg-[#FCF0E0] flex items-center justify-center text-[28px] flex-shrink-0">{food.emoji}</div>
          <div className="flex-1"><p className="text-[13px] font-semibold text-gray-900">{food.title}</p><p className="text-[11px] text-gray-400 mt-0.5 mb-1.5">{food.description}</p>
            <div className="flex justify-between items-center"><span className="text-[15px] font-bold text-food">{food.price}</span>
              <button className="bg-food text-white text-[11px] font-bold px-3 py-1.5 rounded-lg">주문하기</button></div></div>
        </div>
      )}
      <div className="h-1.5 bg-dotori-cream my-1" />
      {/* Board */}
      <div className="flex justify-between items-center px-3.5 py-2.5"><span className="text-[14px] font-bold text-dotori-brown">💬 자유게시판 인기글</span><button onClick={()=>setActiveTab('board')} className="text-[11px] text-dotori-light">더보기 →</button></div>
      {board.map((p) => <BoardPostCard key={p.id} post={p} />)}
    </div>
  );
}

// ── MarketScreen ───────────────────────────────────────────────────
export function MarketScreen() {
  const { posts } = useStore();
  const items = posts.filter((p) => p.category === 'market');
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SearchBar placeholder="중고 물품 검색..." />
      <Chips items={['전체','가구/인테리어','전자기기','의류','유아동','무료나눔']} />
      <div className="scroll-area flex-1 pt-2 pb-20">{items.map((p) => <PostCard key={p.id} post={p} />)}</div>
    </div>
  );
}

// ── FoodScreen ─────────────────────────────────────────────────────
export function FoodScreen() {
  const { posts } = useStore();
  const items = posts.filter((p) => p.category === 'food');
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SearchBar placeholder="반찬, 음식 검색..." />
      <Chips items={['전체','반찬류','김치류','도시락','간식/떡','국/찌개']} color="food" />
      <p className="text-[11px] text-gray-400 px-3.5 py-2 bg-white border-b border-[#EDE0C8]">🌟 이웃이 직접 만든 음식을 주문해 보세요</p>
      <div className="scroll-area flex-1 pt-2 pb-20">
        {items.map((p) => (
          <div key={p.id} className="bg-white rounded-card mx-3.5 mb-2.5 border border-[#EDE0C8] p-3 flex gap-3">
            <div className="w-[60px] h-[60px] rounded-xl bg-[#FCF0E0] flex items-center justify-center text-[28px] flex-shrink-0">{p.emoji}</div>
            <div className="flex-1"><p className="text-[13px] font-semibold text-gray-900">{p.title}</p><p className="text-[11px] text-gray-400 mt-0.5 mb-1.5">{p.description}</p>
              <div className="flex justify-between items-center"><span className="text-[15px] font-bold text-food">{p.price}</span>
                <button className="bg-food text-white text-[11px] font-bold px-3 py-1.5 rounded-lg">주문하기</button></div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── JobsScreen ─────────────────────────────────────────────────────
export function JobsScreen() {
  const { posts, setActivePostId, setActivePage } = useStore();
  const items = posts.filter((p) => p.category === 'jobs');
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SearchBar placeholder="직종, 업체명 검색..." />
      <Chips items={['전체','식당/카페','뷰티/네일','IT/사무직','교육/튜터','구직']} color="green" />
      <div className="scroll-area flex-1 pt-2 pb-20">
        {items.map((p) => (
          <div key={p.id} className="bg-white rounded-card mx-3.5 mb-2.5 border border-[#EDE0C8] p-3.5 cursor-pointer active:opacity-80"
            onClick={() => { setActivePostId(p.id); setActivePage('detail'); }}>
            <div className="flex justify-between items-start mb-2">
              <div><p className="text-[13px] font-semibold text-gray-900">{p.title}</p><p className="text-[11px] text-gray-400 mt-0.5">{p.author} · {p.location}</p></div>
              <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${p.tags.includes('구직') ? 'bg-[#E0EAF5] text-blue' : 'bg-[#E6F0E6] text-job'}`}>{p.tags.includes('구직')?'구직':'구인'}</span>
            </div>
            <p className="text-[12px] text-gray-500 leading-relaxed">{p.description}</p>
            <div className="flex items-center gap-1 mt-2 text-[11px] text-gray-400"><Eye size={12}/> {p.views}<span className="ml-2">{p.timeAgo}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── RealtyScreen ───────────────────────────────────────────────────
export function RealtyScreen() {
  const { posts, setActivePostId, setActivePage } = useStore();
  const items = posts.filter((p) => p.category === 'realty');
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SearchBar placeholder="지역, 가격, 타입 검색..." />
      <Chips items={['전체','렌트','매매','룸메이트','상가/비즈']} color="blue" />
      <div className="scroll-area flex-1 pt-2 pb-20">
        {items.map((p) => (
          <div key={p.id} className="bg-white rounded-card mx-3.5 mb-2.5 border border-[#EDE0C8] overflow-hidden cursor-pointer active:opacity-80"
            onClick={() => { setActivePostId(p.id); setActivePage('detail'); }}>
            <div className="h-[80px] flex items-center justify-center text-[40px]" style={{background:'#E0EAF5'}}>{p.emoji}</div>
            <div className="p-3">
              <div className="flex justify-between items-start"><div><p className="text-[13px] font-semibold text-gray-900">{p.title}</p><p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1"><MapPin size={10}/>{p.location}</p></div>
                {p.tags[0] && <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-[#E0EAF5] text-blue">{p.tags[0]}</span>}</div>
              <p className="text-[15px] font-bold text-blue mt-1">{p.price}</p>
            </div>
            <div className="flex justify-between items-center border-t border-[#F0E8D8] px-3 py-1.5">
              <span className="flex items-center gap-1 text-[11px] text-gray-400"><Eye size={12}/>{p.views}</span>
              <span className="text-[11px] text-gray-400">{p.timeAgo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── BoardScreen ────────────────────────────────────────────────────
export function BoardScreen() {
  const { posts } = useStore();
  const items = posts.filter((p) => p.category === 'board');
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <SearchBar placeholder="게시글 검색..." />
      <Chips items={['전체','생활정보','맛집추천','육아/교육','이민/비자','분실/습득']} />
      <div className="scroll-area flex-1 pt-2 pb-20">{items.map((p) => <BoardPostCard key={p.id} post={p} />)}</div>
    </div>
  );
}

// ── ChatScreen ─────────────────────────────────────────────────────
export function ChatScreen() {
  const { chatRooms, setActiveChatRoomId, setActivePage } = useStore();
  return (
    <div className="flex flex-col h-full">
      <SubHeader title="채팅" onBack={() => setActivePage('main')} />
      <div className="scroll-area flex-1">
        {chatRooms.map((r) => (
          <button key={r.id} className="w-full flex items-center gap-3 p-4 bg-white border-b border-[#F0E8D8] text-left active:bg-gray-50"
            onClick={() => { setActiveChatRoomId(r.id); setActivePage('chatroom'); }}>
            <div className="relative w-[46px] h-[46px] rounded-full bg-dotori-cream flex items-center justify-center text-xl flex-shrink-0">
              {r.emoji}
              {r.unread > 0 && <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full px-1 min-w-[16px] h-[16px] flex items-center justify-center">{r.unread}</span>}
            </div>
            <div className="flex-1 min-w-0"><p className="text-[13px] font-semibold text-gray-900">{r.name}</p><p className="text-[11px] text-gray-400 truncate">{r.lastMessage}</p></div>
            <span className="text-[10px] text-gray-400 flex-shrink-0">{r.lastTime}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── ChatRoomScreen ─────────────────────────────────────────────────
export function ChatRoomScreen() {
  const { chatRooms, activeChatRoomId, sendMessage, setActivePage } = useStore();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const room = chatRooms.find((r) => r.id === activeChatRoomId);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [room?.messages.length]);

  if (!room) return null;

  function send() {
    if (!input.trim() || !activeChatRoomId) return;
    sendMessage(activeChatRoomId, input);
    setInput('');
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-dotori-brown px-4 py-3 flex items-center gap-3">
        <button onClick={() => setActivePage('chat')} className="text-dotori-logo"><ArrowLeft size={20} /></button>
        <span className="font-dodum text-dotori-logo text-[14px] flex-1">{room.name}</span>
      </div>
      {/* Item preview */}
      <div className="mx-3.5 mt-3 bg-white rounded-xl border border-[#EDE0C8] p-2.5 flex items-center gap-2.5 flex-shrink-0">
        <span className="text-xl">{room.emoji}</span>
        <div className="flex-1"><p className="text-[11px] font-semibold text-gray-800">{room.itemName}</p><p className="text-[12px] font-bold text-dotori-brown">{room.itemPrice || '문의 중'}</p></div>
        <span className="text-[11px] text-dotori-light">보기</span>
      </div>
      {/* Messages */}
      <div className="scroll-area flex-1 p-3.5 flex flex-col gap-2">
        {room.messages.map((m) => (
          <div key={m.id} className={`flex items-end gap-2 ${m.isMe ? 'flex-row-reverse' : ''}`}>
            <div className={`max-w-[65%] px-3 py-2 text-[13px] leading-relaxed ${m.isMe ? 'bg-dotori-brown text-dotori-logo rounded-[14px] rounded-br-[4px]' : 'bg-white border border-[#EDE0C8] text-gray-800 rounded-[14px] rounded-bl-[4px]'}`}>
              {m.text}
            </div>
            <span className="text-[10px] text-gray-400">{m.time}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      {/* Input */}
      <div className="flex gap-2 px-3.5 py-2.5 bg-white border-t border-[#EDE0C8] safe-bottom">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key==='Enter'&&send()}
          className="flex-1 bg-dotori-cream rounded-full px-3.5 py-2 text-[13px] text-dotori-brown outline-none placeholder:text-gray-400 font-noto"
          placeholder="메시지 입력..." />
        <button onClick={send} className="w-9 h-9 bg-dotori-brown rounded-full flex items-center justify-center flex-shrink-0">
          <Send size={15} className="text-dotori-logo" />
        </button>
      </div>
    </div>
  );
}

// ── NotificationsScreen ────────────────────────────────────────────
export function NotificationsScreen() {
  const { notifications, markAllRead, setActivePage } = useStore();
  useEffect(() => { markAllRead(); }, []);
  const unread = notifications.filter((n) => n.unread);
  const read   = notifications.filter((n) => !n.unread);

  return (
    <div className="flex flex-col h-full">
      <SubHeader title="알림" onBack={() => setActivePage('main')} />
      <div className="scroll-area flex-1">
        {unread.length > 0 && <p className="text-[11px] font-semibold text-dotori-light px-4 py-2.5">새 알림</p>}
        {notifications.map((n) => (
          <div key={n.id} className={`flex items-start gap-3 px-4 py-3 border-b border-[#F0E8D8] ${n.unread ? 'bg-[#FEF8F0]' : 'bg-white'}`}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0" style={{background:n.iconBg}}>{n.icon}</div>
            <div className="flex-1">
              <p className="text-[12px] font-semibold text-gray-800">{n.title}</p>
              <p className="text-[11px] text-gray-500 leading-relaxed">{n.description}</p>
              <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── WriteScreen ────────────────────────────────────────────────────
const CAT_MAP: Record<string, Post['category']> = { '중고장터':'market','홈메이드':'food','구인구직':'jobs','부동산':'realty','자유게시판':'board' };
const EMOJIS: Record<string, string> = { '중고장터':'📦','홈메이드':'🍱','구인구직':'💼','부동산':'🏠','자유게시판':'💬' };

export function WriteScreen() {
  const { addPost, setActivePage } = useStore();
  const [cat, setCat]   = useState('중고장터');
  const [deal, setDeal] = useState('직거래');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc]   = useState('');

  function submit() {
    if (!title.trim()) return;
    addPost({ id: Date.now().toString(), category: CAT_MAP[cat], title, price, description: desc, location: 'Duluth', timeAgo: '방금 전', likes:0, views:0, tags:[], emoji: EMOJIS[cat]||'📝', author:'김도토리' });
    setActivePage('main');
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-dotori-brown px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setActivePage('main')} className="text-dotori-logo"><X size={20} /></button>
          <span className="font-dodum text-dotori-logo text-[15px]">글쓰기</span>
        </div>
        <button onClick={submit} className="bg-dotori-tag text-dotori-brown text-[12px] font-bold px-4 py-1.5 rounded-full">등록</button>
      </div>
      <div className="scroll-area flex-1 p-4 flex flex-col gap-3">
        <div><p className="text-[12px] font-bold text-dotori-brown mb-2">카테고리</p>
          <div className="flex gap-2 flex-wrap">
            {Object.keys(CAT_MAP).map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 rounded-full text-[12px] border transition-colors ${cat===c ? 'bg-dotori-brown text-dotori-logo border-dotori-brown' : 'bg-white text-gray-500 border-[#EDE0C8]'}`}>{c}</button>
            ))}
          </div>
        </div>
        <div><p className="text-[12px] font-bold text-dotori-brown mb-2">사진 첨부</p>
          <div className="w-[68px] h-[68px] border-2 border-dashed border-dotori-tag rounded-xl flex flex-col items-center justify-center gap-1 text-dotori-light text-[11px] cursor-pointer">📷<span>사진추가</span></div>
        </div>
        <div><p className="text-[12px] font-bold text-dotori-brown mb-2">제목</p>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-white border border-[#EDE0C8] rounded-xl px-3 py-2.5 text-[13px] outline-none font-noto focus:border-dotori-light" placeholder="제목을 입력하세요" /></div>
        <div><p className="text-[12px] font-bold text-dotori-brown mb-2">가격</p>
          <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-white border border-[#EDE0C8] rounded-xl px-3 py-2.5 text-[13px] outline-none font-noto focus:border-dotori-light" placeholder="가격 입력 (예: $50, 무료나눔)" /></div>
        <div><p className="text-[12px] font-bold text-dotori-brown mb-2">내용</p>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={4} className="w-full bg-white border border-[#EDE0C8] rounded-xl px-3 py-2.5 text-[13px] outline-none resize-none font-noto leading-relaxed focus:border-dotori-light" placeholder="내용을 입력해 주세요 😊" /></div>
        <div><p className="text-[12px] font-bold text-dotori-brown mb-2">거래 방법</p>
          <div className="flex gap-2">
            {['직거래','택배거래','픽업'].map((d) => (
              <button key={d} onClick={() => setDeal(d)} className={`px-3 py-1.5 rounded-full text-[12px] border transition-colors ${deal===d ? 'bg-dotori-brown text-dotori-logo border-dotori-brown' : 'bg-white text-gray-500 border-[#EDE0C8]'}`}>{d}</button>
            ))}
          </div>
        </div>
        <button onClick={submit} className="w-full bg-dotori-brown text-dotori-logo font-dodum py-3.5 rounded-xl text-[14px] mt-2">🌰 글 등록하기</button>
      </div>
    </div>
  );
}

// ── ProfileScreen ──────────────────────────────────────────────────
export function ProfileScreen() {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-dotori-brown px-4 py-3 flex items-center justify-between">
        <span className="font-dodum text-dotori-logo text-[15px]">마이페이지</span>
        <Settings size={20} className="text-dotori-logo" />
      </div>
      <div className="scroll-area flex-1">
        {/* Profile banner */}
        <div className="bg-dotori-brown px-5 pb-5">
          <div className="w-[68px] h-[68px] rounded-full bg-dotori-cream flex items-center justify-center text-[30px] mx-auto mb-2.5 border-[3px] border-white/25">🧑‍🦱</div>
          <p className="font-dodum text-dotori-logo text-[17px] text-center">김도토리</p>
          <p className="text-dotori-tag text-[11px] text-center mt-1 flex items-center justify-center gap-1"><MapPin size={10}/>Duluth, GA</p>
          <div className="flex justify-center gap-7 mt-3.5">
            {[['23','판매'],['8','구매'],['240','도토리'],['4.9⭐','평점']].map(([n,l])=>(
              <div key={l} className="text-center"><p className="font-dodum text-dotori-logo text-[17px]">{n}</p><p className="text-dotori-tag text-[10px]">{l}</p></div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-2.5">
            <span className="bg-white/15 text-dotori-logo text-[10.5px] px-3 py-1 rounded-full">✅ 동네 인증</span>
            <span className="bg-white/15 text-dotori-logo text-[10.5px] px-3 py-1 rounded-full">🌰 판매왕</span>
          </div>
        </div>
        <div className="h-2 bg-dotori-cream" />
        {/* Menu groups */}
        {[[['📦','내 판매 목록'],['🛒','구매 내역'],['❤️','찜한 목록'],['💬','내 게시글']],
          [['🌰','도토리 포인트','240개'],['🔔','알림 설정','','3'],['📍','동네 설정'],['⚙️','앱 설정']]].map((group, gi) => (
          <div key={gi} className="bg-white mx-3.5 mb-2.5 rounded-card border border-[#EDE0C8] overflow-hidden mt-3">
            {group.map(([icon, label, right, badge]: any) => (
              <button key={label} className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-[#F0E8D8] last:border-0">
                <span className="text-[19px] w-6">{icon}</span>
                <span className="flex-1 text-[13px] text-gray-700 text-left">{label}</span>
                {right && <span className="text-[13px] font-bold text-dotori-brown mr-2">{right}</span>}
                {badge && <span className="bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 mr-2">{badge}</span>}
                <ChevronRight size={15} className="text-gray-300" />
              </button>
            ))}
          </div>
        ))}
        <div className="h-24" />
      </div>
    </div>
  );
}

// ── PostDetailScreen ───────────────────────────────────────────────
export function PostDetailScreen() {
  const { posts, activePostId, likePost, setActivePage, setActiveChatRoomId } = useStore();
  const post = posts.find((p) => p.id === activePostId);
  if (!post) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="bg-dotori-brown px-4 py-3 flex items-center gap-3">
        <button onClick={() => setActivePage('main')} className="text-dotori-logo"><ArrowLeft size={20} /></button>
        <span className="font-dodum text-dotori-logo text-[14px] flex-1 truncate">{post.title}</span>
      </div>
      <div className="scroll-area flex-1 p-4">
        <div className="h-[160px] bg-dotori-cream rounded-card flex items-center justify-center text-[64px] mb-4">{post.emoji}</div>
        <h1 className="text-[18px] font-bold text-gray-900 mb-2">{post.title}</h1>
        {post.price && <p className={`text-[22px] font-bold mb-2 ${post.price==='무료나눔'?'text-green-700':'text-dotori-brown'}`}>{post.price}</p>}
        <p className="text-[12px] text-gray-400 mb-4 flex items-center gap-1"><MapPin size={11}/>{post.location} · {post.timeAgo}</p>
        {post.description && <p className="text-[14px] text-gray-600 leading-relaxed whitespace-pre-line">{post.description}</p>}
        <div className="flex gap-2.5 mt-6">
          <button onClick={() => likePost(post.id)} className="flex-1 flex items-center justify-center gap-2 bg-dotori-cream py-3.5 rounded-xl">
            <Heart size={18} className={post.liked?'fill-red-500 text-red-500':'text-dotori-brown'} />
            <span className={`text-[14px] font-semibold ${post.liked?'text-red-500':'text-dotori-brown'}`}>찜하기 {post.likes}</span>
          </button>
          <button onClick={() => { setActiveChatRoomId('c1'); setActivePage('chatroom'); }} className="flex-[2] flex items-center justify-center gap-2 bg-dotori-brown py-3.5 rounded-xl">
            <MessageCircle size={18} className="text-dotori-logo" />
            <span className="text-[14px] font-semibold text-dotori-logo">채팅하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
