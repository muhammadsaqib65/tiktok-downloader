# 🚀 EASY DEPLOYMENT GUIDE

**5-Minute Setup to Use This App on Your Phone!**

---

## 🎯 **What You'll Get**

After following these steps, you'll have:
- ✅ Your own permanent URL (like: `https://yourname-tiktok.vercel.app`)
- ✅ Works on your phone
- ✅ Share from TikTok works
- ✅ Free forever
- ✅ Auto-updates when you make changes

---

## 📱 **Why You Can't Host on Mobile**

You **can't host** the app on your phone, but you can:
- ✅ Deploy to free cloud hosting (Vercel/Railway/Render)
- ✅ Then USE it on your phone
- ✅ Install as an app
- ✅ Share from TikTok

**Think of it like this:** The app lives in the cloud, but you use it on your phone!

---

## 🌟 **EASIEST METHOD: Deploy to Vercel**

### **Option A: Deploy via GitHub (Recommended)**

#### Step 1: Upload to GitHub

1. **Create GitHub account:**
   - Go to https://github.com
   - Sign up (free)

2. **Create new repository:**
   - Click "New repository"
   - Name it: `tiktok-downloader`
   - Make it Public
   - Click "Create repository"

3. **Upload your code:**
   - Download all project files from this sandbox
   - On GitHub page, click "uploading an existing file"
   - Drag all files EXCEPT:
     - `node_modules` folder (skip this!)
     - `.env` file (skip this!)
   - Click "Commit changes"

#### Step 2: Deploy to Vercel

1. **Go to Vercel:**
   - https://vercel.com/signup
   - Click "Continue with GitHub"
   - Authorize Vercel

2. **Import your project:**
   - Click "Add New..." → "Project"
   - Select your `tiktok-downloader` repository
   - Click "Import"

3. **Configure:**
   - Framework: Next.js (auto-detected)
   - Click "Deploy"
   - Wait 2-3 minutes ⏳

4. **Done!** You'll get a URL like:
   ```
   https://tiktok-downloader.vercel.app
   ```

#### Step 3: Add Database

1. **In Vercel dashboard:**
   - Go to your project
   - Click "Storage" tab
   - Click "Create Database"
   - Select "Postgres"
   - Choose "Hobby" (free)
   - Click "Create"

2. **Connect database:**
   - Database auto-connects to your app!
   - Vercel sets `DATABASE_URL` automatically

3. **Apply schema:**
   - In Vercel, go to "Settings" → "Environment Variables"
   - Your `DATABASE_URL` should already be there ✅
   - Now run schema (see below)

#### Step 4: Add API Key (Optional but Recommended)

1. **Get RapidAPI key:**
   - Go to https://rapidapi.com
   - Sign up (free)
   - Search for "TikTok Download Without Watermark"
   - Subscribe to free tier
   - Copy your API key

2. **Add to Vercel:**
   - In Vercel: Settings → Environment Variables
   - Name: `RAPIDAPI_KEY`
   - Value: paste your key
   - Click "Save"

3. **Redeploy:**
   - Go to "Deployments"
   - Click ⋯ menu on latest
   - "Redeploy"

#### Step 5: Apply Database Schema

Open terminal and run:
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link to your project
vercel link

# Apply database schema
npx drizzle-kit push
```

---

### **Option B: Deploy Without GitHub (Simpler)**

#### Use Vercel CLI Directly:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   # In your project folder:
   vercel
   ```

4. **Follow prompts:**
   - Link to Vercel account
   - Set up project
   - Deploy!

5. **Production deploy:**
   ```bash
   vercel --prod
   ```

6. **You'll get a URL!**

---

## 🎯 **Alternative: Railway (Also Easy)**

### **Steps:**

1. **Go to Railway:**
   - https://railway.app
   - Sign up with GitHub (free)

2. **Deploy:**
   - Click "New Project"
   - "Deploy from GitHub"
   - Select your repository
   - OR click "Deploy from template"

3. **Add Database:**
   - Click "+ New"
   - Select "Database" → "Add PostgreSQL"
   - DATABASE_URL auto-configured! ✅

4. **Add Environment Variables:**
   - Click your app
   - Variables tab
   - Add `RAPIDAPI_KEY` (optional)

5. **Deploy:**
   - Automatic!
   - Wait 2-3 minutes

6. **Get URL:**
   - Settings → Generate Domain
   - You'll get: `yourapp.up.railway.app`

---

## 🎯 **Alternative: Render (Free)**

### **Steps:**

1. **Go to Render:**
   - https://render.com
   - Sign up (free)

2. **Create Web Service:**
   - New → Web Service
   - Connect GitHub
   - Select repository

3. **Configure:**
   - Name: tiktok-downloader
   - Build: `npm install && npm run build`
   - Start: `npm start`

4. **Add Database:**
   - New → PostgreSQL
   - Create database
   - Copy connection string

5. **Add Environment Variables:**
   - In Web Service settings
   - Add `DATABASE_URL` = connection string
   - Add `RAPIDAPI_KEY` (optional)

6. **Deploy:**
   - Click "Create Web Service"
   - Wait 3-5 minutes

7. **Get URL:**
   - You'll get: `yourapp.onrender.com`

---

## ✅ **After Deployment - Test It!**

### Step 1: Visit Your URL
```
https://your-app-name.vercel.app
```

### Step 2: Test on Desktop
- Should load the app
- Try pasting a TikTok URL
- Download should work

### Step 3: Test on Mobile

**Install the app:**

**Android:**
1. Open Chrome
2. Go to your URL
3. Tap "Install" button
4. Open from app drawer

**iPhone:**
1. Open Safari
2. Go to your URL
3. Share → "Add to Home Screen"
4. Open from home screen

**Share from TikTok:**
1. Open TikTok
2. Find video
3. Share → Your app
4. Downloads! 🎉

---

## 🐛 **Troubleshooting**

### "Sandbox not found" error

**Problem:** You're using the temporary sandbox URL
**Solution:** Deploy to Vercel/Railway and use that URL instead

### Build fails

**Check:**
- Did you upload all files except node_modules?
- Is package.json included?
- Check build logs in Vercel/Railway

### Database error

**Solution:**
1. Make sure DATABASE_URL is set
2. Run `npx drizzle-kit push` to create tables
3. Check connection string is correct

### App won't install on phone

**Check:**
- Is your URL HTTPS? (should be ✅ with Vercel/Railway)
- Using Chrome (Android) or Safari (iOS)?
- Deployed site loads correctly?

---

## 💡 **Quick Comparison**

| Platform | Setup Time | Free Tier | Database | Best For |
|----------|------------|-----------|----------|----------|
| **Vercel** | 5 min | ✅ Yes | ✅ Postgres | Easiest! |
| **Railway** | 5 min | ✅ $5 credit | ✅ Auto | Great DB |
| **Render** | 10 min | ✅ Yes | ✅ Postgres | Free tier |

**Recommendation: Vercel** (fastest, easiest, free forever)

---

## 📋 **Complete Setup Checklist**

- [ ] Create Vercel/Railway account
- [ ] Upload code to GitHub (or use CLI)
- [ ] Deploy to platform
- [ ] Add database
- [ ] Set DATABASE_URL
- [ ] Add RAPIDAPI_KEY (optional)
- [ ] Apply database schema
- [ ] Test on desktop
- [ ] Test on mobile
- [ ] Install as app
- [ ] Test share from TikTok
- [ ] ✅ Done!

---

## 🎉 **Your URL Will Be:**

**Vercel:**
```
https://your-project-name.vercel.app
```

**Railway:**
```
https://your-project-name.up.railway.app
```

**Render:**
```
https://your-project-name.onrender.com
```

**You can also add a custom domain!**

---

## 🎯 **Summary**

**What you need to do:**

1. ✅ Create account on Vercel (free)
2. ✅ Upload code to GitHub
3. ✅ Deploy on Vercel (3 clicks)
4. ✅ Add database (1 click)
5. ✅ Get your permanent URL
6. ✅ Use on your phone!

**Time needed:** 5-10 minutes
**Cost:** $0 (FREE forever!)

---

## 🆘 **Need Help?**

**If you get stuck:**

1. **Vercel has great docs:**
   - https://vercel.com/docs

2. **Watch YouTube:**
   - Search "deploy next.js to vercel"
   - Lots of 5-minute tutorials

3. **Common issues:**
   - Not seeing install button? → Use HTTPS URL
   - Share not working? → Deploy to real URL (not sandbox)
   - Database error? → Add DATABASE_URL and run schema

---

## 🚀 **Next Steps**

After deployment:

1. **Share your URL with friends:**
   - They can use it too!
   - No installation needed for them

2. **Install on your phone:**
   - Follow mobile installation guide
   - Use share feature

3. **Start downloading:**
   - TikTok → Share → Your app
   - 10 seconds per video!

---

**The key point:** 

❌ You **cannot** host on your phone
✅ You **can** deploy to cloud (free)
✅ Then **use** it on your phone
✅ Takes only 5 minutes!

**Let's get you deployed! 🚀**
