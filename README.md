# 🎵 TikTok Video Downloader

A modern, fullstack web application built with Next.js that allows you to download TikTok videos **without watermarks** in HD quality.

![TikTok Downloader](https://img.shields.io/badge/TikTok-Downloader-ff0050?style=for-the-badge&logo=tiktok&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql)

## ✨ Features

- ✅ **No Watermark** - Download TikTok videos without watermarks
- ✅ **HD Quality** - Get videos in highest quality available
- ✅ **Audio Download** - Extract and download music/audio separately
- ✅ **Fast & Free** - No registration or payment required
- ✅ **Modern UI** - Beautiful gradient interface with responsive design
- ✅ **Database Tracking** - Track download history using PostgreSQL
- ✅ **Multiple APIs** - Fallback support if primary API fails

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- (Optional) RapidAPI key for premium features

### Installation Steps

1. **Clone or create the project**
   ```bash
   # The project is already set up in your sandbox
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory (if not exists) with:
   ```env
   DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db
   
   # Optional: RapidAPI key for premium API access
   # Sign up at https://rapidapi.com and subscribe to TikTok Download API
   RAPIDAPI_KEY=your_rapidapi_key_here
   ```

4. **Apply database schema**
   ```bash
   npx drizzle-kit push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📖 How to Use

### For Users:

1. **Copy TikTok Video URL**
   - Open TikTok app or website
   - Find the video you want to download
   - Tap the "Share" button
   - Select "Copy Link"

2. **Paste URL in the App**
   - Open the TikTok Downloader app
   - Paste the URL in the input field
   - Click "Get Video" button

3. **Download**
   - Wait for the video to load
   - Choose quality (SD or HD)
   - Click download button
   - Video will download without watermark!

### Example TikTok URLs:

```
https://www.tiktok.com/@username/video/1234567890123456789
https://vm.tiktok.com/ZMLxxxxxx/
https://vt.tiktok.com/ZSxxxxxx/
```

## 🛠️ Technical Details

### Tech Stack

- **Frontend**: Next.js 16 (React 19, App Router)
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL with Drizzle ORM
- **API**: Multiple TikTok download APIs with fallback support
- **TypeScript**: Full type safety

### Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── download/
│   │   │   │   └── route.ts      # TikTok download API endpoint
│   │   │   └── health/
│   │   │       └── route.ts      # Health check endpoint
│   │   ├── page.tsx              # Main page (downloader UI)
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   └── db/
│       ├── index.ts              # Database connection
│       └── schema.ts             # Database schema (downloads table)
├── .env                          # Environment variables
├── package.json                  # Dependencies
└── README.md                     # This file
```

### Database Schema

```typescript
// downloads table
{
  id: serial (primary key)
  videoUrl: text (TikTok URL)
  videoTitle: text (Video title)
  author: text (Content creator)
  downloadedAt: timestamp (Auto-generated)
}
```

## 🔑 API Setup (Optional)

The app works with a free API by default, but for better reliability, you can use RapidAPI:

1. **Sign up for RapidAPI**
   - Go to [https://rapidapi.com](https://rapidapi.com)
   - Create a free account

2. **Subscribe to TikTok Download API**
   - Search for "TikTok Download Without Watermark"
   - Subscribe to a free tier (usually 100-500 requests/month)
   - Copy your API key

3. **Add to Environment Variables**
   ```env
   RAPIDAPI_KEY=your_api_key_here
   ```

### Recommended APIs on RapidAPI:

- **TikTok Download Without Watermark** - Most reliable
- **TikTok NoWatermark Full Services** - Good free tier
- **TikTok Downloader** - Fast and simple

## 🎨 Customization

### Change Color Scheme

Edit `src/app/page.tsx` and modify the gradient classes:

```tsx
// Current gradient (purple to pink to red)
className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500"

// Example: Blue theme
className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500"
```

### Modify Database Schema

1. Edit `src/db/schema.ts`
2. Run `npx drizzle-kit push` to apply changes

## 📝 API Endpoints

### POST `/api/download`

Download TikTok video without watermark.

**Request:**
```json
{
  "url": "https://www.tiktok.com/@username/video/1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "downloadUrl": "https://...",
    "hdDownloadUrl": "https://...",
    "title": "Video Title",
    "author": "Username",
    "thumbnail": "https://...",
    "music": "https://..."
  }
}
```

### GET `/api/download`

Get recent download history.

**Response:**
```json
{
  "success": true,
  "downloads": [
    {
      "id": 1,
      "videoUrl": "https://...",
      "videoTitle": "...",
      "author": "...",
      "downloadedAt": "2026-01-15T10:30:00Z"
    }
  ]
}
```

## ⚠️ Important Notes

- **Copyright**: Respect content creators' rights. Only download videos you have permission to use.
- **Personal Use**: Downloaded videos should be for personal use only.
- **Rate Limits**: Free APIs have rate limits. Consider upgrading for heavy usage.
- **Private Videos**: Cannot download private or restricted videos.
- **Age Restrictions**: Cannot download age-restricted content.

## 🐛 Troubleshooting

### "Failed to download video"

- Check if the URL is correct and public
- Try a different video URL
- Verify API keys are correct (if using RapidAPI)
- Check internet connection

### Database Connection Error

- Ensure PostgreSQL is running
- Verify DATABASE_URL in `.env`
- Run `npx drizzle-kit push` to create tables

### Build Errors

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Type check
npm run typecheck

# Build
npm run build
```

## 📦 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables for Production

```env
DATABASE_URL=your_production_database_url
RAPIDAPI_KEY=your_rapidapi_key (optional)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [RapidAPI](https://rapidapi.com)

## 💬 Support

If you have any questions or need help, please:
1. Check the troubleshooting section
2. Review the API documentation
3. Create an issue on GitHub

---

**Made with ❤️ using Next.js and PostgreSQL**

**Note**: This tool is for educational purposes. Always respect copyright and content creators' rights.
