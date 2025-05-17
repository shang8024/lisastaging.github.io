import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import {HouseGallery, HouseGallerySkeleton} from '@/components/HouseCard/HouseGallery';
import { getPostbyId, getAllPosts } from '@/lib/posts';
// const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateStaticParams() {
  // Get all non-disabled posts
  const posts = await getAllPosts();
  return posts.map(post => ({
    houseId: post.id
  }));
}

export default async function HousePage({ params }: { params: Promise<{ houseId: string }> }) {
  const {houseId} = await params;
  
  // Check if the post is disabled
  try {
    const post = await getPostbyId(houseId);
    if (post.disabled === true) {
      notFound();
    }
  } catch (_) {
    notFound();
  }
  
  const filePath = path.join(process.cwd(), 'public', 'images', houseId, 'meta.json');

  if (!fs.existsSync(filePath)) {
    notFound();
  }
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { images } = JSON.parse(fileContent);

  return (
    <main>
      <section className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-bold mb-2 capitalize">Explore Our Recent Staging Project</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto sm:mx-0">
          A beautifully staged property showcasing thoughtful furniture placement, lighting, and accessories designed to inspire buyers and maximize appeal.
        </p>
      </section>
      <Suspense fallback={<HouseGallerySkeleton/>}>
          <HouseGallery images={images} houseId={houseId}/>
      </Suspense>
    </main>
  );
}