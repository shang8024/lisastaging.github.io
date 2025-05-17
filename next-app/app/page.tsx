import { getAllPosts } from '@/lib/posts';
import {Hero} from '@/components/Hero/Hero';
import ClientMapWrapper from '@/components/Map/ClientMapWrapper';

export default async function Home() {
  const allPosts = await getAllPosts();
  
  // Filter to only show featured posts
  const featuredPosts = allPosts.filter(post => post.featured === true);

  return (
    <main className="flex flex-col gap-[16px] md:gap-[32px] row-start-2 items-center sm:items-start w-full h-full">
      <Hero/>
      <ClientMapWrapper posts={featuredPosts}/>
    </main>
  );
}
