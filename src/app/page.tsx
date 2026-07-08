'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface VideoData {
  downloadUrl: string;
  hdDownloadUrl: string;
  title: string;
  author: string;
  thumbnail: string;
  music: string;
}

function HomeContent() {
  const searchParams = useSearchParams();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  // Check if running as PWA
  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);
  }, []);

  // Handle shared URL from other apps
  useEffect(() => {
    const sharedUrl = searchParams.get('url');
    if (sharedUrl) {
      setUrl(sharedUrl);
      // Auto-submit if URL is valid
      if (sharedUrl.includes('tiktok.com')) {
        handleDownloadWithUrl(sharedUrl);
      }
    }
  }, [searchParams]);

  const handleDownloadWithUrl = async (tiktokUrl: string) => {
    setError('');
    setVideoData(null);
    setLoading(true);

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: tiktokUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to download video');
      }

      setVideoData(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleDownloadWithUrl(url);
  };

  const handleDirectDownload = async (videoUrl: string, filename: string) => {
    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      // Fallback: open in new tab
      window.open(videoUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-6 md:py-12">
        {/* PWA Status Banner */}
        {isStandalone && (
          <div className="mb-6 bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg text-center">
            <p className="text-sm font-semibold">
              ✅ App Installed! You can now share TikTok videos directly to this app.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            🎵 TikTok Downloader
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Download videos without watermark in HD
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 mb-8">
          {/* Download Form */}
          <form onSubmit={handleDownload} className="mb-8">
            <div className="mb-4">
              <label htmlFor="url" className="block text-gray-700 font-semibold mb-2">
                Enter TikTok Video URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.tiktok.com/@username/video/..."
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-800"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                >
                  {loading ? '⏳ Loading...' : '🔍 Get Video'}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                <strong>Error:</strong> {error}
              </div>
            )}
          </form>

          {/* Video Preview */}
          {videoData && (
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                ✅ Video Ready to Download
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Video Info */}
                <div>
                  {videoData.thumbnail && (
                    <img
                      src={videoData.thumbnail}
                      alt={videoData.title}
                      className="w-full rounded-lg shadow-lg mb-4"
                    />
                  )}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {videoData.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Author: <span className="font-medium">{videoData.author}</span>
                    </p>
                  </div>
                </div>

                {/* Download Buttons */}
                <div className="flex flex-col justify-center gap-4">
                  {videoData.downloadUrl && (
                    <div>
                      <button
                        onClick={() =>
                          handleDirectDownload(
                            videoData.downloadUrl,
                            `tiktok-${videoData.author}-sd.mp4`
                          )
                        }
                        className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
                      >
                        ⬇️ Download SD (No Watermark)
                      </button>
                    </div>
                  )}

                  {videoData.hdDownloadUrl && (
                    <div>
                      <button
                        onClick={() =>
                          handleDirectDownload(
                            videoData.hdDownloadUrl,
                            `tiktok-${videoData.author}-hd.mp4`
                          )
                        }
                        className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
                      >
                        ⬇️ Download HD (No Watermark)
                      </button>
                    </div>
                  )}

                  {videoData.music && (
                    <div>
                      <a
                        href={videoData.music}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg text-center"
                      >
                        🎵 Download Music Only
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Share Feature Banner */}
        {!isStandalone && (
          <div className="max-w-4xl mx-auto mb-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-4xl">📱</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Install Mobile App!</h3>
                <p className="text-white/90 text-sm mb-3">
                  Install this app on your phone to <strong>share TikTok videos directly</strong> without leaving TikTok!
                </p>
                <div className="bg-white/20 rounded-lg p-3 text-xs space-y-1">
                  <p>📲 <strong>iPhone:</strong> Safari → Share → Add to Home Screen</p>
                  <p>🤖 <strong>Android:</strong> Chrome → Menu → Install App</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* How to Use */}
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">📖 How to Use</h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center bg-white/10 rounded-2xl p-4">
              <div className="text-4xl mb-3">1️⃣</div>
              <h3 className="font-semibold mb-2">Copy TikTok URL</h3>
              <p className="text-white/80 text-sm">
                In TikTok: Share → Copy Link
              </p>
            </div>
            <div className="text-center bg-white/10 rounded-2xl p-4">
              <div className="text-4xl mb-3">2️⃣</div>
              <h3 className="font-semibold mb-2">Paste Here</h3>
              <p className="text-white/80 text-sm">
                Or share directly to this app!
              </p>
            </div>
            <div className="text-center bg-white/10 rounded-2xl p-4">
              <div className="text-4xl mb-3">3️⃣</div>
              <h3 className="font-semibold mb-2">Download</h3>
              <p className="text-white/80 text-sm">
                HD, SD, or Music - no watermark!
              </p>
            </div>
          </div>
          
          {/* Quick Share Guide for Mobile */}
          <div className="mt-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-4 border border-white/20">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span>Quick Share (Mobile)</span>
            </h4>
            <ol className="text-sm space-y-2 text-white/90">
              <li><strong>1.</strong> Install this app on your phone</li>
              <li><strong>2.</strong> In TikTok, tap Share button</li>
              <li><strong>3.</strong> Select this app from share menu</li>
              <li><strong>4.</strong> Video downloads automatically! 🎉</li>
            </ol>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-3">✨ Features</h3>
            <ul className="space-y-2 text-white/90">
              <li>✅ No watermark on downloaded videos</li>
              <li>✅ HD quality downloads available</li>
              <li>✅ Download music/audio separately</li>
              <li>✅ Fast and free to use</li>
              <li>✅ No registration required</li>
            </ul>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-3">⚠️ Important Notes</h3>
            <ul className="space-y-2 text-white/90 text-sm">
              <li>• Respect copyright and content creators</li>
              <li>• Use downloaded content responsibly</li>
              <li>• Some videos may not be downloadable</li>
              <li>• Private videos cannot be downloaded</li>
              <li>• For best results, use public TikTok URLs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Loading...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
