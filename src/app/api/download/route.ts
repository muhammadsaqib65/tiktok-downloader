import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { downloads } from '@/db/schema';

// Function to extract video ID from TikTok URL
function extractVideoId(url: string): string | null {
  const patterns = [
    /tiktok\.com\/@[\w.-]+\/video\/(\d+)/,
    /tiktok\.com\/v\/(\d+)/,
    /vm\.tiktok\.com\/(\w+)/,
    /vt\.tiktok\.com\/(\w+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'TikTok URL is required' },
        { status: 400 }
      );
    }

    // Validate TikTok URL
    if (!url.includes('tiktok.com')) {
      return NextResponse.json(
        { error: 'Invalid TikTok URL' },
        { status: 400 }
      );
    }

    let videoData;
    
    // Try RapidAPI first if key is available
    if (process.env.RAPIDAPI_KEY) {
      try {
        const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': 'tiktok-download-without-watermark.p.rapidapi.com'
          }
        };

        const apiUrl = `https://tiktok-download-without-watermark.p.rapidapi.com/analysis?url=${encodeURIComponent(url)}`;
        const response = await fetch(apiUrl, options);
        
        if (response.ok) {
          const data = await response.json();
          videoData = {
            downloadUrl: data.data?.play || data.data?.wmplay || '',
            hdDownloadUrl: data.data?.hdplay || '',
            title: data.data?.title || 'TikTok Video',
            author: data.data?.author?.nickname || data.data?.author?.unique_id || 'Unknown',
            thumbnail: data.data?.cover || data.data?.origin_cover || '',
            music: data.data?.music || '',
          };
        }
      } catch (error) {
        console.error('RapidAPI error, trying fallback:', error);
      }
    }

    // Fallback to free API
    if (!videoData) {
      try {
        // Using a free TikTok API endpoint
        const freeApiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
        const response = await fetch(freeApiUrl);
        
        if (!response.ok) {
          throw new Error('Failed to fetch video data from fallback API');
        }

        const data = await response.json();

        if (data.code !== 0) {
          throw new Error(data.msg || 'Failed to process video');
        }

        videoData = {
          downloadUrl: data.data?.play || data.data?.wmplay || '',
          hdDownloadUrl: data.data?.hdplay || data.data?.play || '',
          title: data.data?.title || 'TikTok Video',
          author: data.data?.author?.nickname || data.data?.author?.unique_id || 'Unknown',
          thumbnail: data.data?.cover || data.data?.origin_cover || '',
          music: data.data?.music || data.data?.music_info?.play || '',
        };
      } catch (fallbackError) {
        console.error('Fallback API error:', fallbackError);
        throw new Error('All API methods failed. Please try again later.');
      }
    }

    // Save download record to database (if available)
    try {
      if (db) {
        await db.insert(downloads).values({
          videoUrl: url,
          videoTitle: videoData.title,
          author: videoData.author,
        });
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue even if database save fails
    }

    return NextResponse.json({
      success: true,
      data: videoData,
    });
  } catch (error) {
    console.error('Error downloading TikTok video:', error);
    return NextResponse.json(
      { 
        error: 'Failed to download video. Please check the URL and try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get recent downloads from database (if available)
    if (!db) {
      return NextResponse.json({
        success: true,
        downloads: [],
        message: 'Database not configured'
      });
    }
    
    const recentDownloads = await db.select().from(downloads).limit(10).orderBy(downloads.downloadedAt);
    
    return NextResponse.json({
      success: true,
      downloads: recentDownloads,
    });
  } catch (error) {
    console.error('Error fetching downloads:', error);
    return NextResponse.json({
      success: true,
      downloads: [],
      error: 'Database error'
    });
  }
}
