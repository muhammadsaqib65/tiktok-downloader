'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ShareHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get the shared URL from query params
    const sharedUrl = searchParams.get('url') || searchParams.get('text') || searchParams.get('title') || '';
    
    if (sharedUrl) {
      // Redirect to home with the URL
      router.replace(`/?url=${encodeURIComponent(sharedUrl)}`);
    } else {
      // No URL shared, go to home
      router.replace('/');
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Processing Share...</h2>
        <p className="text-gray-600 text-sm">
          Opening TikTok downloader...
        </p>
      </div>
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Loading...</p>
        </div>
      </div>
    }>
      <ShareHandler />
    </Suspense>
  );
}
