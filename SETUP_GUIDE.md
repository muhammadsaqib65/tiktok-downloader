# 🚀 TikTok Downloader - Step-by-Step Setup Guide

This guide will walk you through setting up the TikTok Video Downloader app from scratch.

## 📋 Prerequisites Check

Before starting, make sure you have:

- ✅ Node.js 18 or higher installed
- ✅ PostgreSQL database access
- ✅ Basic terminal/command line knowledge
- ✅ (Optional) RapidAPI account for enhanced features

## 🎯 Step-by-Step Installation

### Step 1: Verify Node.js Installation

```bash
node --version
# Should show v18.x.x or higher

npm --version
# Should show 9.x.x or higher
```

If not installed, download from [nodejs.org](https://nodejs.org)

### Step 2: Verify PostgreSQL

```bash
# Check if PostgreSQL is running
psql --version

# Connect to database (adjust credentials as needed)
psql postgresql://postgres:postgres@127.0.0.1:5432/app_db
```

If PostgreSQL is not installed:
- **macOS**: `brew install postgresql`
- **Ubuntu**: `sudo apt-get install postgresql`
- **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/)

### Step 3: Project Setup

The project is already set up in your sandbox. If you're setting up fresh:

```bash
# Navigate to project directory
cd /path/to/tiktok-downloader

# Verify files exist
ls -la
# Should see: src/, package.json, .env, etc.
```

### Step 4: Install Dependencies

```bash
# Install all required packages
npm install

# This installs:
# - next (framework)
# - react & react-dom (UI)
# - drizzle-orm (database)
# - pg (PostgreSQL driver)
# - tailwindcss (styling)
# - And more...
```

Wait for installation to complete (may take 1-2 minutes).

### Step 5: Configure Environment Variables

1. **Check if `.env` file exists:**
   ```bash
   cat .env
   ```

2. **If it doesn't exist, create it:**
   ```bash
   touch .env
   ```

3. **Add the following content:**
   ```env
   # Database Connection
   DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db
   
   # Optional: RapidAPI Key (for premium features)
   # Get your key from https://rapidapi.com
   # RAPIDAPI_KEY=your_key_here
   ```

4. **Adjust database URL if needed:**
   ```
   Format: postgresql://[user]:[password]@[host]:[port]/[database]
   
   Example:
   DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/tiktok_db
   ```

### Step 6: Set Up Database Schema

```bash
# Push schema to database (creates the 'downloads' table)
npx drizzle-kit push

# You should see output like:
# ✓ Downloaded metadata from the database
# ✓ Table 'downloads' created
```

If you get an error:
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Verify database exists

### Step 7: Test the Application

```bash
# Start development server
npm run dev
```

You should see:
```
▲ Next.js 16.x.x
- Local:        http://localhost:3000
- ready in X ms
```

### Step 8: Open in Browser

1. Open your browser
2. Go to `http://localhost:3000`
3. You should see the TikTok Downloader interface

### Step 9: Test Download Functionality

1. **Find a TikTok video:**
   - Open TikTok app or tiktok.com
   - Choose any public video
   - Copy the link (Share → Copy Link)

2. **Paste in the app:**
   - Paste URL in the input field
   - Click "Get Video"
   - Wait 2-5 seconds

3. **Download:**
   - Click "Download SD" or "Download HD"
   - Video should download without watermark!

## 🔑 Optional: RapidAPI Setup

For better reliability and higher rate limits:

### Step 1: Create RapidAPI Account

1. Go to [https://rapidapi.com](https://rapidapi.com)
2. Click "Sign Up"
3. Use email or Google/GitHub to sign up
4. Verify your email

### Step 2: Subscribe to TikTok API

1. Search for "TikTok Download" in RapidAPI
2. Choose one of these APIs:
   - **TikTok Download Without Watermark**
   - **TikTok NoWatermark Full Services**
   - **TikTok Downloader**

3. Click "Subscribe to Test"
4. Choose a plan:
   - **Free**: Usually 100-500 requests/month
   - **Basic**: $5-10/month for 10,000+ requests
   - **Pro**: Higher limits

5. Click "Subscribe"

### Step 3: Get Your API Key

1. Go to your API dashboard
2. Find "X-RapidAPI-Key" in the code examples
3. Copy the key (looks like: `abc123def456...`)

### Step 4: Add to .env File

```bash
# Open .env file
nano .env

# Add this line (replace with your actual key):
RAPIDAPI_KEY=your_actual_api_key_here

# Save and exit (Ctrl+X, Y, Enter)
```

### Step 5: Restart Development Server

```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

## 🧪 Testing & Verification

### Test 1: Health Check

```bash
curl http://localhost:3000/api/health
# Should return: {"status":"ok"}
```

### Test 2: Database Connection

```bash
# Check if downloads table exists
psql postgresql://postgres:postgres@127.0.0.1:5432/app_db -c "\dt"

# Should show:
# Schema | Name      | Type  | Owner
# public | downloads | table | postgres
```

### Test 3: API Endpoint

```bash
# Test download API (replace with real TikTok URL)
curl -X POST http://localhost:3000/api/download \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.tiktok.com/@tiktok/video/7106594312292453675"}'
```

Should return JSON with video data.

## 🎨 Customization

### Change App Title

Edit `src/app/layout.tsx`:
```tsx
export const metadata = {
  title: 'Your Custom Title',
  description: 'Your custom description',
}
```

### Change Colors

Edit `src/app/page.tsx`, find:
```tsx
className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500"
```

Try different gradients:
- Blue: `from-blue-600 via-cyan-500 to-teal-500`
- Green: `from-green-600 via-emerald-500 to-teal-500`
- Orange: `from-orange-600 via-red-500 to-pink-500`

### Add More Features

Track download count:
```typescript
// In src/db/schema.ts, add to downloads table:
downloadCount: integer('download_count').default(0)
```

Then run: `npx drizzle-kit push`

## 📦 Production Deployment

### Build for Production

```bash
# Create production build
npm run build

# Should complete without errors
# Output: .next folder created
```

### Test Production Build

```bash
# Start production server
npm start

# Open http://localhost:3000
# Test all features work
```

### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   # Follow the prompts
   ```

4. **Add Environment Variables:**
   - Go to Vercel dashboard
   - Select your project
   - Settings → Environment Variables
   - Add `DATABASE_URL` and `RAPIDAPI_KEY`

5. **Redeploy:**
   ```bash
   vercel --prod
   ```

### Deploy to Other Platforms

- **Netlify**: Connect GitHub repo, add build command `npm run build`
- **Railway**: Connect repo, add DATABASE_URL automatically
- **Render**: Similar to Railway with free PostgreSQL

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot connect to database"

**Solution:**
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Start if stopped
sudo service postgresql start

# Verify connection
psql postgresql://postgres:postgres@127.0.0.1:5432/app_db
```

### Issue 2: "Module not found"

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
```

### Issue 3: "Failed to download video"

**Solutions:**
1. Check if TikTok URL is valid and public
2. Try a different video
3. Add RapidAPI key for better reliability
4. Check internet connection

### Issue 4: "Port 3000 already in use"

**Solution:**
```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
kill -9 [PID]

# Or use different port
PORT=3001 npm run dev
```

### Issue 5: TypeScript errors

**Solution:**
```bash
# Run type check
npm run typecheck

# Check specific file
npx tsc src/app/page.tsx --noEmit
```

## 📚 Next Steps

After successful setup:

1. ✅ **Test with multiple videos** - Try different TikTok URLs
2. ✅ **Check database** - View downloaded records in PostgreSQL
3. ✅ **Monitor API usage** - If using RapidAPI, check your quota
4. ✅ **Customize UI** - Change colors, add features
5. ✅ **Deploy to production** - Share with others!

## 🎓 Learning Resources

- [Next.js Tutorial](https://nextjs.org/learn)
- [React Documentation](https://react.dev)
- [Drizzle ORM Guide](https://orm.drizzle.team/docs/overview)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 💡 Tips for Success

1. **Always test locally first** before deploying
2. **Keep dependencies updated** - Run `npm outdated` regularly
3. **Monitor API rate limits** - Don't exceed free tier limits
4. **Backup database** - Export data regularly
5. **Read error messages** - They usually tell you what's wrong
6. **Use version control** - Commit changes with Git

## 🎉 You're Done!

Your TikTok Video Downloader is now ready to use!

If you encounter any issues not covered here, check:
- README.md for detailed documentation
- Error messages in terminal
- Browser console (F12)
- API logs

**Happy downloading! 🚀**
