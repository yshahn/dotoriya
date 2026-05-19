'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react';
import { useStore } from '@/store';

export default function ChatPage() {
  const router = useRouter();
  const { chatRooms, sendMessage } = useStore();
  const [activeRoom, setActiveRoom] = useState<string|null>(null);
  const [text, setText] = useState('');
  const msgsRef = useRef<HTMLDivElement>(null);
  const room = chatRooms.find(r=>r.id===activeRoom);

  useEffect(()=>{ msgsRef.current?.scrollTo(0, msgsRef.current.scrollHeight); }, [room?.messages.length]);

  if (activeRoom && room) return (
    <div className="app-shell flex flex-col" style={{height:'100svh'}}>
      {/* Header */}
      <div className="px-4 pt-3 pb-3 flex items-center gap-3" style={{background:'#6B3F1F'}}>
        <button onClick={()=>setActiveRoom(null)} style={{background:'none',border:'none',cursor:'pointer'}}><ArrowLeft size={22} color="#FAF0D0"/></button>
        <span className="flex-1 font-display text-[15px]" style={{color:'#FAF0D0'}}>{room.name}</span>
        <MoreVertical size={20} color="#FAF0D0"/>
      </div>
      {/* Item preview */}
      <div className="flex items-center gap-2 mx-3.5 mt-2.5 p-2.5 bg-white rounded-[10px] border border-[#EDE0C8]">
        <span className="text-[20px]">{room.emoji}</span>
        <div className="flex-1"><p className="text-[11px] font-semibold text-gray-800">{room.itemName}</p><p className="text-[12px] font-bold" style={{color:'#6B3F1F'}}>{room.itemPrice||'문의 중'}</p></div>
        <span className="text-[11px]" style={{color:'#A05C2C'}}>보기</span>
      </div>
      {/* Messages */}
      <div ref={msgsRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-2" style={{background:'#FAF5EC',paddingBottom:80}}>
        {room.messages.map(m=>(
          <div key={m.id} className={`flex items-end gap-2 ${m.isMe?'flex-row-reverse':''}`}>
            <div className="max-w-[65%] rounded-[14px] px-3 py-2.5" style={{background:m.isMe?'#6B3F1F':'white',borderRadius:m.isMe?'14px 14px 4px 14px':'14px 14px 14px 4px',border:m.isMe?'none':'0.5px solid #EDE0C8'}}>
              <p className="text-[13px] leading-relaxed" style={{color:m.isMe?'#FAF0D0':'#222'}}>{m.text}</p>
            </div>
            <span className="text-[10px] text-gray-400">{m.time}</span>
          </div>
        ))}
      </div>
      {/* Input */}
      <div className="flex items-center gap-2 p-2.5 bg-white border-t border-[#EDE0C8]" style={{paddingBottom:'max(10px, env(safe-area-inset-bottom))'}}>
        <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&text.trim()){sendMessage(activeRoom,text);setText('');}}}
          className="flex-1 rounded-[20px] px-3.5 py-2 text-[13px] outline-none border-none" style={{background:'#F5ECD7',color:'#6B3F1F',fontFamily:'inherit'}}
          placeholder="메시지 입력..."/>
        <button onClick={()=>{if(text.trim()){sendMessage(activeRoom,text);setText('');}}}
          className="w-9 h-9 rounded-full flex items-center justify-center" style={{background:'#6B3F1F',border:'none',cursor:'pointer'}}>
          <Send size={15} color="#FAF0D0"/>
        </button>
      </div>
    </div>
  );

  return (
    <div className="app-shell">
      <div className="px-4 pt-3 pb-3 flex items-center gap-3" style={{background:'#6B3F1F'}}>
        <button onClick={()=>router.back()} style={{background:'none',border:'none',cursor:'pointer'}}><ArrowLeft size={22} color="#FAF0D0"/></button>
        <span className="font-display text-[15px]" style={{color:'#FAF0D0'}}>채팅</span>
      </div>
      {chatRooms.map(r=>(
        <button key={r.id} onClick={()=>setActiveRoom(r.id)} className="w-full flex items-center gap-3 px-4 py-3.5 bg-white border-b border-[#F0E8D8]" style={{cursor:'pointer',border:'none',borderBottom:'0.5px solid #F0E8D8'}}>
          <div className="relative w-[46px] h-[46px] rounded-full flex items-center justify-center text-[20px] shrink-0" style={{background:'#F5ECD7'}}>
            {r.emoji}
            {r.unread>0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{r.unread}</span>}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-[13px] font-semibold text-gray-900 mb-0.5">{r.name}</p>
            <p className="text-[11px] text-gray-400 truncate">{r.lastMessage}</p>
          </div>
          <span className="text-[10px] text-gray-400 shrink-0">{r.lastTime}</span>
        </button>
      ))}
    </div>
  );
}
