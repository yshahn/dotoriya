'use client';
import { Settings, Package, ShoppingCart, Heart, MessageCircle, Award, Bell, MapPin, ChevronRight } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const MENUS1 = [{icon:Package,label:'내 판매 목록'},{icon:ShoppingCart,label:'구매 내역'},{icon:Heart,label:'찜한 목록'},{icon:MessageCircle,label:'내 게시글'}];
const MENUS2 = [{icon:Award,label:'도토리 포인트',right:'240개'},{icon:Bell,label:'알림 설정',badge:'3'},{icon:MapPin,label:'동네 설정'},{icon:Settings,label:'앱 설정'}];

export default function ProfilePage() {
  return (
    <div className="app-shell">
      {/* Header */}
      <div className="px-4 pt-3 pb-3 flex items-center justify-between" style={{background:'#6B3F1F'}}>
        <span className="font-display text-[15px]" style={{color:'#FAF0D0'}}>마이페이지</span>
        <Settings size={20} color="#FAF0D0"/>
      </div>

      <main className="page-content">
        {/* Profile banner */}
        <div className="px-4 pt-5 pb-5" style={{background:'#6B3F1F'}}>
          <div className="w-[68px] h-[68px] rounded-full flex items-center justify-center text-[30px] mx-auto mb-2.5 border-[3px]" style={{background:'#F5ECD7',borderColor:'rgba(255,255,255,0.25)'}}>🧑‍🦱</div>
          <p className="font-display text-[17px] text-center mb-1" style={{color:'#FAF0D0'}}>김도토리</p>
          <div className="flex items-center justify-center gap-1 mb-3.5">
            <MapPin size={11} color="#D4A96A"/>
            <span className="text-[11px]" style={{color:'#D4A96A'}}>Duluth, GA</span>
          </div>
          {/* Stats */}
          <div className="flex justify-center gap-7">
            {[['23','판매'],['8','구매'],['240','도토리'],['4.9⭐','평점']].map(([n,l])=>(
              <div key={l} className="text-center">
                <p className="font-display text-[17px]" style={{color:'#FAF0D0'}}>{n}</p>
                <p className="text-[10px]" style={{color:'#D4A96A'}}>{l}</p>
              </div>
            ))}
          </div>
          {/* Trust badges */}
          <div className="flex gap-2 justify-center mt-3">
            {['✅ 동네 인증','🌰 판매왕'].map(b=>(
              <span key={b} className="text-[10.5px] px-3 py-1 rounded-full" style={{background:'rgba(255,255,255,0.15)',color:'#FAF0D0'}}>{b}</span>
            ))}
          </div>
        </div>

        <div className="h-2" style={{background:'#F5ECD7'}}/>

        {/* Menu group 1 */}
        <div className="bg-white mx-3.5 my-2.5 rounded-[14px] overflow-hidden border border-[#EDE0C8]">
          {MENUS1.map(({icon:Icon,label},i)=>(
            <button key={label} className="w-full flex items-center gap-3 px-4 py-3.5 text-left" style={{background:'none',border:'none',borderBottom:i<MENUS1.length-1?'0.5px solid #F0E8D8':'none',cursor:'pointer'}}>
              <Icon size={19} color="#A05C2C" style={{width:24}}/>
              <span className="flex-1 text-[13px] text-gray-700">{label}</span>
              <ChevronRight size={15} color="#bbb"/>
            </button>
          ))}
        </div>

        {/* Menu group 2 */}
        <div className="bg-white mx-3.5 mb-2.5 rounded-[14px] overflow-hidden border border-[#EDE0C8]">
          {MENUS2.map(({icon:Icon,label,right,badge}:any,i)=>(
            <button key={label} className="w-full flex items-center gap-3 px-4 py-3.5 text-left" style={{background:'none',border:'none',borderBottom:i<MENUS2.length-1?'0.5px solid #F0E8D8':'none',cursor:'pointer'}}>
              <Icon size={19} color="#A05C2C" style={{width:24}}/>
              <span className="flex-1 text-[13px] text-gray-700">{label}</span>
              {right && <span className="text-[13px] font-bold mr-2" style={{color:'#6B3F1F'}}>{right}</span>}
              {badge && <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full mr-2">{badge}</span>}
              <ChevronRight size={15} color="#bbb"/>
            </button>
          ))}
        </div>
        <div className="h-6"/>
      </main>
      <BottomNav/>
    </div>
  );
}
