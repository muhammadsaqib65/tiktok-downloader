# ⚡ Quick Start - TikTok Video Downloader

Get up and running in 5 minutes!

## 🚀 Fast Setup (3 Commands)

```bash
# 1. Install dependencies
npm install

# 2. Set up database
npx drizzle-kit push

# 3. Start the app
npm run dev
```

Then open: **http://localhost:3000**

## 🎯 Basic Usage

1. **Copy** a TikTok video URL
2. **Paste** it into the app
3. **Click** "Get Video"
4. **Download** without watermark!

## 📝 Environment Setup

Create `.env` file:

```env
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db
```

Optional - for better reliability:
```env
RAPIDAPI_KEY=your_key_from_rapidapi.com
```

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm start                # Start production server

# Database
npx drizzle-kit push     # Update database schema
npx drizzle-kit studio   # Open database GUI

# Type checking
npm run typecheck        # Check TypeScript errors
```

## 🐛 Quick Troubleshooting

### Can't connect to database?
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Start it
sudo service postgresql start
```

### Port 3000 in use?
```bash
# Use different port
PORT=3001 npm run dev
```

### Module errors?
```bash
# Clean install
rm -rf node_modules .next
npm install
```

## 📱 How to Get TikTok URLs

### Mobile App:
1. Open TikTok
2. Tap Share icon
3. Tap "Copy Link"
4. Paste in app

### Website:
1. Go to tiktok.com
2. Open any video
3. Copy URL from browser
4. Paste in app

## 🎨 Supported URL Formats

✅ `https://www.tiktok.com/@user/video/123456`
✅ `https://vm.tiktok.com/ABC123/`
✅ `https://vt.tiktok.com/XYZ456/`

## ⚙️ File Structure

```
tiktok-downloader/
├── src/
│   ├── app/
│   │   ├── api/download/route.ts  ← API logic
│   │   └── page.tsx               ← Main UI
│   └── db/
│       ├── schema.ts              ← Database tables
│       └── index.ts               ← DB connection
├── .env                           ← Config
└── package.json                   ← Dependencies
```

## 🔑 Get RapidAPI Key (Optional)

1. Go to [rapidapi.com](https://rapidapi.com)
2. Sign up (free)
3. Search "TikTok Download"
4. Subscribe to free plan
5. Copy API key
6. Add to `.env`

Free tier: ~100-500 requests/month

## 📊 Check It's Working

```bash
# Health check
curl http://localhost:3000/api/health

# Test download (replace URL)
curl -X POST http://localhost:3000/api/download \
  -H "Content-Type: application/json" \
  -d '{"url":"PASTE_TIKTOK_URL_HERE"}'
```

## 🎓 Next Steps

After setup:
- ✅ Test with multiple videos
- ✅ Check database in PostgreSQL
- ✅ Customize the UI colors
- ✅ Deploy to production

## 📚 Full Documentation

- **README.md** - Complete documentation
- **SETUP_GUIDE.md** - Detailed setup instructions
- **This file** - Quick reference

## 💡 Pro Tips

1. **Bookmark the app** for quick access
2. **Use HD download** for best quality
3. **Check API limits** if using RapidAPI
4. **Keep URLs public** - private videos won't work

## ⚡ Performance

- Download time: 2-5 seconds
- Supports: SD, HD, and Music downloads
- No file size limits
- Works on all devices

---

**Questions?** Check the full documentation in README.md

**Need help?** See SETUP_GUIDE.md for detailed instructions

**Ready?** Just run `npm run dev` and start downloading! 🚀
