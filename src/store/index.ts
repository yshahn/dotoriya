// src/store/index.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Category = 'market' | 'food' | 'jobs' | 'realty' | 'board';

export interface Post {
  id: string;
  category: Category;
  title: string;
  price?: string;
  location: string;
  emoji: string;
  timeAgo: string;
  likes: number;
  views: number;
  tags: string[];
  liked?: boolean;
  author: string;
  description?: string;
  createdAt: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  isMe: boolean;
  time: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  emoji: string;
  itemName: string;
  itemPrice: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: ChatMessage[];
}

export interface Notification {
  id: string;
  icon: string;
  iconBg: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

interface AppState {
  location: string;
  setLocation: (l: string) => void;
  posts: Post[];
  likePost: (id: string) => void;
  addPost: (p: Omit<Post, 'id' | 'createdAt' | 'likes' | 'views'>) => void;
  chatRooms: ChatRoom[];
  sendMessage: (roomId: string, text: string) => void;
  notifications: Notification[];
  markAllRead: () => void;
}

const SEED_POSTS: Post[] = [
  { id:'1', category:'market', emoji:'🛋️', title:'이케아 EKTORP 소파 (베이지)', price:'$120', location:'Duluth', timeAgo:'3시간 전', likes:12, views:89, tags:['중고','상태 양호'], author:'소파판매자', description:'사용한 지 2년 된 소파입니다. 상태 매우 양호하고 오염 없어요. 직거래만 가능합니다.', createdAt: Date.now()-3*3600*1000 },
  { id:'2', category:'market', emoji:'📱', title:'아이폰 14 Pro 128G 스페이스블랙', price:'$680', location:'Johns Creek', timeAgo:'5시간 전', likes:8, views:54, tags:['중고'], author:'폰팔아요', description:'케이스 항상 착용, 파손 없음. 배터리 88%.', createdAt: Date.now()-5*3600*1000 },
  { id:'3', category:'market', emoji:'👗', title:'노스페이스 롱패딩 M 블랙', price:'$85', location:'Suwanee', timeAgo:'1일 전', likes:5, views:31, tags:['중고'], author:'옷팔아요', createdAt: Date.now()-24*3600*1000 },
  { id:'4', category:'market', emoji:'🧸', title:'레고 시티 세트 무료 나눔', price:'무료나눔', location:'Alpharetta', timeAgo:'30분 전', likes:31, views:142, tags:['무료'], author:'나눔천사', description:'일부 소실 있으나 대부분 완전합니다. 아이 있는 분 우선!', createdAt: Date.now()-30*60*1000 },
  { id:'5', category:'market', emoji:'🖥️', title:'LG 27인치 4K 모니터', price:'$230', location:'Duluth', timeAgo:'2일 전', likes:7, views:66, tags:['중고'], author:'모니터팔아요', createdAt: Date.now()-48*3600*1000 },
  { id:'6', category:'market', emoji:'🚲', title:'어린이 자전거 (16인치)', price:'$45', location:'Johns Creek', timeAgo:'4시간 전', likes:3, views:28, tags:['중고'], author:'자전거맘', description:'5~7세 아이용. 보조바퀴 포함.', createdAt: Date.now()-4*3600*1000 },

  { id:'7',  category:'food', emoji:'🥘', title:'갈비찜 (2~3인분)', price:'$28', location:'Duluth', timeAgo:'오늘', likes:22, views:110, tags:['반찬류'], author:'언니네반찬', description:'언니네 반찬 ⭐4.9 (리뷰 38) — 당일 픽업 또는 Duluth 배달 가능', createdAt: Date.now()-2*3600*1000 },
  { id:'8',  category:'food', emoji:'🥗', title:'깍두기 + 배추김치 세트 (각 1kg)', price:'$22', location:'Johns Creek', timeAgo:'오늘', likes:18, views:95, tags:['김치류'], author:'김치명인', description:'김치명인 ⭐5.0 (리뷰 61) — 직접 담근 국내산 재료 사용', createdAt: Date.now()-3*3600*1000 },
  { id:'9',  category:'food', emoji:'🍱', title:'도시락 세트 (3가지 반찬)', price:'$15', location:'Suwanee', timeAgo:'오늘', likes:9, views:44, tags:['도시락'], author:'새벽반찬', description:'새벽반찬 ⭐4.8 (리뷰 22) — 매일 아침 7시 준비', createdAt: Date.now()-1*3600*1000 },
  { id:'10', category:'food', emoji:'🎂', title:'수제 떡케이크 (생일 세트)', price:'$45', location:'Duluth', timeAgo:'오늘', likes:15, views:77, tags:['간식/떡'], author:'생일마을', description:'생일마을 ⭐4.9 (리뷰 17) — 3일 전 예약 필수', createdAt: Date.now()-6*3600*1000 },
  { id:'11', category:'food', emoji:'🍜', title:'잔치국수 + 녹두전 세트', price:'$20', location:'Alpharetta', timeAgo:'오늘', likes:11, views:55, tags:['국/찌개'], author:'할머니손맛', description:'할머니손맛 ⭐5.0 (리뷰 9) — 주말만 판매', createdAt: Date.now()-5*3600*1000 },

  { id:'12', category:'jobs', emoji:'🍽️', title:'한식당 홀 서빙 직원 구합니다', location:'Duluth', timeAgo:'1일 전', likes:0, views:203, tags:['구인','식당'], author:'서울가든', description:'파트타임 가능 · 주 3~5일 · 시급 $14~16\n한국어 가능자 우대, 식사 제공', createdAt: Date.now()-24*3600*1000 },
  { id:'13', category:'jobs', emoji:'💅', title:'네일샵 테크니션 모집 (풀타임)', location:'Suwanee', timeAgo:'2일 전', likes:0, views:156, tags:['구인','뷰티'], author:'핑크네일', description:'경력자 우대 · 면허 소지자 시급 $20+\n4대 보험, 팁 별도', createdAt: Date.now()-48*3600*1000 },
  { id:'14', category:'jobs', emoji:'📚', title:'중학교 수학 한국어 과외 선생님', location:'Johns Creek', timeAgo:'3시간 전', likes:0, views:88, tags:['구인','교육'], author:'교육맘', description:'중2~3학년 · 주 2회 · 시급 $30\n한국어 가능 선생님 선호', createdAt: Date.now()-3*3600*1000 },
  { id:'15', category:'jobs', emoji:'💻', title:'프론트엔드 개발자 구직합니다', location:'Johns Creek', timeAgo:'5시간 전', likes:0, views:72, tags:['구직','IT'], author:'개발자K', description:'React/Vue 경력 5년 · 한/영 이중언어\n리모트 또는 하이브리드 희망', createdAt: Date.now()-5*3600*1000 },

  { id:'16', category:'realty', emoji:'🏡', title:'2BR/2BA 아파트 렌트', price:'$1,850/월', location:'Duluth', timeAgo:'5시간 전', likes:0, views:312, tags:['렌트','즉시입주','펫허용'], author:'부동산왕', description:'Peachtree Pkwy 인근 · 커뮤니티 수영장·피트니스 포함\n즉시 입주 가능, 펫 허용 (소형)', createdAt: Date.now()-5*3600*1000 },
  { id:'17', category:'realty', emoji:'🏠', title:'단독주택 매매 4BR/3BA', price:'$620,000', location:'Johns Creek', timeAgo:'1일 전', likes:0, views:189, tags:['매매','Top학교'], author:'집팔아요', description:'Northview High School 학군 · 리모델링 완료\n오픈하우스: 이번 주 토요일 2~4시', createdAt: Date.now()-24*3600*1000 },
  { id:'18', category:'realty', emoji:'🛏️', title:'룸메이트 구합니다 (여성 선호)', price:'$750/월 (유틸포함)', location:'Suwanee', timeAgo:'2일 전', likes:0, views:241, tags:['룸메이트','즉시입주'], author:'룸메구함', description:'한인타운 5분 거리 · 주방 공유 · 주차 1대 포함\n조용하고 깔끔한 분 환영', createdAt: Date.now()-48*3600*1000 },

  { id:'19', category:'board', emoji:'😊', title:'Suwanee 새 한식당 후기 아시는 분?', location:'Duluth', timeAgo:'2시간 전', likes:24, views:156, tags:['맛집'], author:'애틀랜타맘', description:'Suwanee에 새로 생긴 한식당 가보신 분 있나요? 갈비찜이 맛있다고 소문났는데 직접 가보신 후기 궁금해요 😋', createdAt: Date.now()-2*3600*1000 },
  { id:'20', category:'board', emoji:'🧑‍💼', title:'Gwinnett 학교 입학 서류 질문', location:'Johns Creek', timeAgo:'4시간 전', likes:18, views:88, tags:['육아/교육'], author:'GA이민생활', description:'Gwinnett 카운티 학교 입학 서류 준비하신 분들 계시나요? 백신 서류는 어디서 받아야 하나요? 도움 주시면 감사합니다 🙏', createdAt: Date.now()-4*3600*1000 },
  { id:'21', category:'board', emoji:'🌸', title:'Lilburn 코리안 페스티벌 정보', location:'Alpharetta', timeAgo:'6시간 전', likes:36, views:203, tags:['생활정보'], author:'둘째맘', description:'이번 주말 Lilburn 코리안 페스티벌 아이들 데리고 가볼만 한가요? 주차 사정은 어떤지 아시는 분 계신가요!', createdAt: Date.now()-6*3600*1000 },
  { id:'22', category:'board', emoji:'🎓', title:'조지아 주립대 근처 한식 추천', location:'Atlanta', timeAgo:'어제', likes:12, views:67, tags:['맛집'], author:'유학생A', description:'조지아 주립대 근처 한식 먹을 수 있는 곳 추천해 주세요! 학교 근처엔 한식집이 너무 없네요 😅', createdAt: Date.now()-24*3600*1000 },
];

const SEED_CHATS: ChatRoom[] = [
  { id:'c1', name:'소파판매자', emoji:'🛋️', itemName:'이케아 EKTORP 소파', itemPrice:'$120', lastMessage:'직거래 가능해요! Duluth 어디 편하세요?', lastTime:'10분 전', unread:2,
    messages:[
      { id:'m1', text:'안녕하세요! 소파 아직 있나요?', isMe:true, time:'오전 10:20' },
      { id:'m2', text:'네 있어요! 상태 정말 좋습니다 😊', isMe:false, time:'오전 10:21' },
      { id:'m3', text:'직거래 가능해요! Duluth 어디 편하세요?', isMe:false, time:'오전 10:22' },
    ] },
  { id:'c2', name:'언니네반찬', emoji:'🍱', itemName:'갈비찜 2~3인분', itemPrice:'$28', lastMessage:'내일 오후 2시에 준비됩니다 😊', lastTime:'1시간 전', unread:0,
    messages:[
      { id:'m1', text:'갈비찜 주문하고 싶어요!', isMe:true, time:'오전 9:00' },
      { id:'m2', text:'주문 감사해요 🙏 내일 오후 2시에 준비됩니다 😊', isMe:false, time:'오전 9:05' },
    ] },
  { id:'c3', name:'핑크네일', emoji:'💅', itemName:'네일샵 문의', itemPrice:'', lastMessage:'이번 주 토요일 오전 자리 있어요!', lastTime:'어제', unread:0,
    messages:[
      { id:'m1', text:'토요일 예약 가능한가요?', isMe:true, time:'어제 오후 2:10' },
      { id:'m2', text:'이번 주 토요일 오전 자리 있어요!', isMe:false, time:'어제 오후 2:15' },
    ] },
];

const SEED_NOTIFS: Notification[] = [
  { id:'n1', icon:'🍱', iconBg:'#FCF0E0', title:'언니네반찬 · 주문 확인', description:'갈비찜 주문이 확인되었습니다. 내일 오후 2시에 준비됩니다.', time:'10분 전', unread:true },
  { id:'n2', icon:'🛋️', iconBg:'#F0EAE0', title:'내 소파 게시물에 관심 12명', description:'이케아 EKTORP 소파 게시물을 12명이 찜했습니다.', time:'1시간 전', unread:true },
  { id:'n3', icon:'💬', iconBg:'#E6F0E6', title:'애틀랜타맘 님이 댓글', description:'\'갈비찜 진짜 맛있어요! 강추합니다 😊\'', time:'2시간 전', unread:true },
  { id:'n4', icon:'🏠', iconBg:'#E8EFF8', title:'새 부동산 매물 · 관심 지역', description:'Duluth에 새 렌트 매물 2BR $1,850/월', time:'어제', unread:false },
  { id:'n5', icon:'🌰', iconBg:'#F5ECD7', title:'도토리야 · 출석 도토리 적립', description:'오늘 출석 도토리 10개 적립! 누적 240개', time:'어제', unread:false },
];

const AUTO_REPLIES = ['네, 알겠습니다 😊', '직거래 가능해요!', '좋아요, 연락드릴게요!', '감사합니다 🙏', '내일 오후 어떠세요?', '확인하고 연락드릴게요!'];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      location: 'Atlanta, GA · Duluth 근처',
      setLocation: (l) => set({ location: l }),

      posts: SEED_POSTS,
      likePost: (id) => set((s) => ({
        posts: s.posts.map((p) => p.id === id ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p),
      })),
      addPost: (data) => set((s) => ({
        posts: [{ ...data, id: Date.now().toString(), likes: 0, views: 0, createdAt: Date.now() }, ...s.posts],
      })),

      chatRooms: SEED_CHATS,
      sendMessage: (roomId, text) => set((s) => {
        const now = new Date();
        const t = `${now.getHours() < 12 ? '오전' : '오후'} ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')}`;
        const myMsg: ChatMessage = { id: Date.now().toString(), text, isMe: true, time: t };
        const autoMsg: ChatMessage = { id: (Date.now()+1).toString(), text: AUTO_REPLIES[Math.floor(Math.random()*AUTO_REPLIES.length)], isMe: false, time: t };
        return {
          chatRooms: s.chatRooms.map((r) => r.id === roomId
            ? { ...r, messages: [...r.messages, myMsg, autoMsg], lastMessage: autoMsg.text, lastTime: '방금' }
            : r),
        };
      }),

      notifications: SEED_NOTIFS,
      markAllRead: () => set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, unread: false })) })),
    }),
    { name: 'dotoriya-store', partialize: (s) => ({ location: s.location, posts: s.posts, chatRooms: s.chatRooms }) }
  )
);
