'use client';
import { Heart, Eye } from 'lucide-react';
import { useStore, type Post } from '@/store';
import { useRouter } from 'next/navigation';

const TAG_STYLE: Record<string,string> = {
  '중고':'bg-[#F0EAE0] text-[#A05C2C]','상태 양호':'bg-[#FEF0E6] text-[#E07B39]',
  '무료':'bg-[#E8F4E8] text-[#2D7A2D]','무료나눔':'bg-[#E8F4E8] text-[#2D7A2D]',
  '구인':'bg-[#E6F0E6] text-[#3D6B3A]','구직':'bg-[#E0EAF5] text-[#1A5FA8]',
  '렌트':'bg-[#E0EAF5] text-[#1A5FA8]','매매':'bg-[#FCF0E0] text-[#C05A10]',
  '룸메이트':'bg-[#F5ECD7] text-[#A05C2C]',
};

export function PostCard({ post }: { post: Post }) {
  const { likePost } = useStore();
  const router = useRouter();
  return (
    <div className="dotori-card cursor-pointer" onClick={() => router.push(`/post/${post.id}`)}>
      <div className="flex gap-3 p-3">
        <div className="w-[72px] h-[72px] rounded-[10px] flex items-center justify-center text-[28px] shrink-0 bg-[#F5ECD7]">{post.emoji}</div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-gray-900 truncate">{post.title}</p>
          <p className="text-[11px] text-gray-400 mt-0.5 mb-1">{post.location} · {post.timeAgo}</p>
          {post.price && <p className="text-[15px] font-bold" style={{color: post.price==='무료나눔'?'#2D7A2D':'#6B3F1F'}}>{post.price}</p>}
          {post.tags.length>0 && (
            <div className="flex gap-1 mt-1.5 flex-wrap">
              {post.tags.slice(0,3).map(t=><span key={t} className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${TAG_STYLE[t]||'bg-[#F0EAE0] text-[#A05C2C]'}`}>{t}</span>)}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center px-3.5 py-2 border-t border-[#F0E8D8]">
        <button className="flex items-center gap-1" onClick={e=>{e.stopPropagation();likePost(post.id);}}>
          <Heart size={13} fill={post.liked?'#C0392B':'none'} color={post.liked?'#C0392B':'#aaa'}/>
          <span className="text-[11px] text-gray-400">{post.likes}</span>
        </button>
        <div className="flex items-center gap-1"><Eye size={12} color="#aaa"/><span className="text-[11px] text-gray-400">{post.views}</span></div>
      </div>
    </div>
  );
}

export function JobCard({ post }: { post: Post }) {
  const router = useRouter();
  const isHiring = post.tags.includes('구인');
  return (
    <div className="dotori-card cursor-pointer p-3.5" onClick={() => router.push(`/post/${post.id}`)}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-gray-900 mb-0.5">{post.title}</p>
          <p className="text-[11px] text-gray-400">{post.author} · {post.location}</p>
        </div>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ml-2 shrink-0 ${isHiring?'bg-[#E6F0E6] text-[#3D6B3A]':'bg-[#E0EAF5] text-[#1A5FA8]'}`}>{isHiring?'구인':'구직'}</span>
      </div>
      <p className="text-[12px] text-gray-600 leading-relaxed whitespace-pre-line">{post.description}</p>
      <div className="flex items-center gap-1 mt-2"><Eye size={12} color="#aaa"/><span className="text-[11px] text-gray-400">{post.views}</span><span className="text-[11px] text-gray-400 ml-3">{post.timeAgo}</span></div>
    </div>
  );
}

export function RealtyCard({ post }: { post: Post }) {
  const router = useRouter();
  const typeColor:Record<string,string> = {'렌트':'bg-[#E0EAF5] text-[#1A5FA8]','매매':'bg-[#FCF0E0] text-[#C05A10]','룸메이트':'bg-[#F5ECD7] text-[#A05C2C]'};
  const type = post.tags[0]||'렌트';
  return (
    <div className="dotori-card cursor-pointer overflow-hidden" onClick={() => router.push(`/post/${post.id}`)}>
      <div className="h-20 flex items-center justify-center text-[40px] bg-[#E0EAF5]">{post.emoji}</div>
      <div className="p-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-[13px] font-semibold text-gray-900 mb-0.5">{post.title}</p>
            <p className="text-[11px] text-gray-400 mb-1.5">{post.location}</p>
          </div>
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ml-2 shrink-0 ${typeColor[type]||'bg-[#E0EAF5] text-[#1A5FA8]'}`}>{type}</span>
        </div>
        <p className="text-[15px] font-bold text-[#1A5FA8]">{post.price}</p>
      </div>
      <div className="flex justify-between items-center px-3.5 py-2 border-t border-[#F0E8D8]">
        <div className="flex items-center gap-1"><Eye size={12} color="#aaa"/><span className="text-[11px] text-gray-400">{post.views}</span></div>
        <span className="text-[11px] text-gray-400">{post.timeAgo}</span>
      </div>
    </div>
  );
}

export function BoardCard({ post }: { post: Post }) {
  const { likePost } = useStore();
  const router = useRouter();
  return (
    <div className="dotori-card cursor-pointer p-3.5" onClick={() => router.push(`/post/${post.id}`)}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[16px] shrink-0 bg-[#F5ECD7]">{post.emoji}</div>
        <div><p className="text-[12px] font-semibold text-gray-800">{post.author}</p><p className="text-[11px] text-gray-400">{post.location} · {post.timeAgo}</p></div>
      </div>
      <p className="text-[13px] text-gray-700 leading-relaxed line-clamp-3">{post.description}</p>
      <div className="flex gap-4 mt-2.5">
        <button className="flex items-center gap-1" onClick={e=>{e.stopPropagation();likePost(post.id);}}>
          <Heart size={14} fill={post.liked?'#C0392B':'none'} color={post.liked?'#C0392B':'#aaa'}/>
          <span className="text-[11px] text-gray-400">{post.likes}</span>
        </button>
        <div className="flex items-center gap-1"><Eye size={14} color="#aaa"/><span className="text-[11px] text-gray-400">{post.views}</span></div>
      </div>
    </div>
  );
}
