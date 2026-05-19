'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Share2, Heart, MessageCircle } from 'lucide-react';
import { useStore } from '@/store';

export default function PostDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { posts, likePost } = useStore();
  const post = posts.find(p => p.id === id);

  if (!post) return (
    <div className="app-shell flex items-center justify-center" style={{minHeight:'100svh'}}>
      <p className="text-gray-400">게시물을 찾을 수 없습니다</p>
    </div>
  );

  return (
    <div className="app-shell">
      <div className="px-4 pt-3 pb-3 flex items-center gap-3" style={{background:'#6B3F1F'}}>
        <button onClick={()=>router.back()} style={{background:'none',border:'none',cursor:'pointer'}}><ArrowLeft size={22} color="#FAF0D0"/></button>
        <span className="flex-1 text-[14px] font-semibold truncate" style={{color:'#FAF0D0'}}>{post.title}</span>
        <Share2 size={20} color="#FAF0D0"/>
      </div>
      <div className="page-content p-4">
        <div className="h-48 rounded-[14px] flex items-center justify-center text-[72px] mb-4" style={{background:'#F5ECD7'}}>{post.emoji}</div>
        <h1 className="text-[18px] font-bold text-gray-900 mb-2">{post.title}</h1>
        {post.price && <p className="text-[22px] font-bold mb-1" style={{color:post.price==='무료나눔'?'#2D7A2D':'#6B3F1F'}}>{post.price}</p>}
        <p className="text-[12px] text-gray-400 mb-4">{post.location} · {post.timeAgo}</p>
        {post.description && (
          <div className="bg-white rounded-[12px] p-4 border border-[#EDE0C8] mb-4">
            <p className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-line">{post.description}</p>
          </div>
        )}
        <div className="flex items-center gap-3 bg-white rounded-[12px] p-3.5 border border-[#EDE0C8] mb-6">
          <div className="w-10 h-10 rounded-full bg-[#F5ECD7] flex items-center justify-center text-[18px]">👤</div>
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-gray-900">{post.author}</p>
            <p className="text-[11px] text-gray-400">⭐ 4.9 · 판매 23건</p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <button onClick={()=>likePost(post.id)} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[12px]" style={{background:'#F5ECD7',border:'none',cursor:'pointer'}}>
            <Heart size={18} fill={post.liked?'#C0392B':'none'} color={post.liked?'#C0392B':'#6B3F1F'}/>
            <span className="text-[14px] font-bold" style={{color:'#6B3F1F'}}>찜하기 {post.likes}</span>
          </button>
          <button onClick={()=>router.push('/chat')} className="flex-[2] flex items-center justify-center gap-2 py-3.5 rounded-[12px]" style={{background:'#6B3F1F',border:'none',cursor:'pointer'}}>
            <MessageCircle size={18} color="#FAF0D0"/>
            <span className="text-[14px] font-bold" style={{color:'#FAF0D0'}}>채팅하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
