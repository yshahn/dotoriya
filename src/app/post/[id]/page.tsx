import PostDetailClient from './client';

export function generateStaticParams() {
  return [];
}

export default function PostDetailPage({ params }: { params: { id: string } }) {
  return <PostDetailClient id={params.id} />;
}
