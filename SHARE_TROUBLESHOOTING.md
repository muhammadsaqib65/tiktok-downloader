# 🔧 Share Feature Troubleshooting

Complete guide to fix share issues on mobile devices.

---

## ✅ **Fixed: Connection Refused Error**

The "0.0.0.0 refused to connect" error has been **FIXED**!

### What was wrong:
- The share handler was using server-internal URLs
- Redirects were pointing to `0.0.0.0` instead of your domain

### What we fixed:
- Changed share target to use GET method
- Created client-side share page
- Proper URL handling with browser redirects
- Works with any domain/deployment

---

## 📱 **How Share Feature Works Now**

### Flow:
1. User shares from TikTok
2. OS calls: `https://your-domain.com/share?url=...`
3. Share page loads with loading spinner
4. Client-side redirect to: `/?url=...`
5. Main page auto-processes the video
6. User downloads!

### Files:
- `public/manifest.json` - Share target config (GET method)
- `src/app/share/page.tsx` - Share handler page
- `src/app/page.tsx` - Main page with auto-download

---

## 🚀 **Quick Test**

### Test the Share Feature:

1. **Deploy to HTTPS** (required for PWA)
   ```bash
   # Example with Vercel
   vercel --prod
   ```

2. **Install on your phone**
   - iPhone: Safari → Share → Add to Home Screen
   - Android: Chrome → Install App

3. **Test sharing**
   - Open TikTok
   - Find any video
   - Tap Share
   - Select your app (might be called "TikDL" or domain name)

4. **Should work!**
   - App opens with loading screen
   - Redirects to main page
   - URL auto-fills
   - Video processes automatically

---

## 🐛 **Common Issues & Solutions**

### Issue 1: App not in share menu

**Symptoms:**
- Don't see the app when sharing from TikTok
- Share menu doesn't show your app

**Solutions:**

**Android:**
1. Make sure app is INSTALLED (not just bookmarked)
   - Look for "Install" button, not just "Add to Home Screen"
   - Check in App Drawer, not just home screen

2. Clear TikTok cache:
   - TikTok → Settings → Clear Cache
   - Restart TikTok app

3. Try sharing once to browser:
   - Share to Chrome/Edge first
   - Then try sharing to your app

4. Reinstall the app:
   - Remove from home screen
   - Reinstall using "Install App" button

**iOS:**
1. Share from Safari to your app once first:
   - Open your app in Safari
   - Share a test TikTok URL to it
   - This "registers" the app

2. Use Safari (not Chrome):
   - iOS PWA features only work in Safari
   - Chrome/Firefox won't show install option

3. Make sure iOS 13+:
   - Share Target requires iOS 13 or higher
   - Check: Settings → General → About → Version

---

### Issue 2: Share opens browser instead of app

**Symptoms:**
- Tapping share opens browser, not standalone app
- URL shows in browser bar

**Solutions:**

**Android:**
1. Verify standalone installation:
   - App should have been "Installed" not just "Added to Home Screen"
   - Look for "Install" prompt in Chrome

2. Check manifest:
   - Open DevTools → Application → Manifest
   - Verify `display: "standalone"`

3. Reinstall properly:
   - Chrome → Menu → "Install app"
   - NOT "Add to Home screen"

**iOS:**
1. Add to Home Screen correctly:
   - Use Safari's Share button
   - Select "Add to Home Screen"
   - NOT just bookmark

2. Open from home screen icon:
   - Don't open from Safari
   - Tap the icon on home screen

---

### Issue 3: Share URL doesn't auto-fill

**Symptoms:**
- App opens but URL field is empty
- Have to manually paste URL

**Solutions:**

1. **Check the share flow:**
   - Make sure you're using the share sheet
   - Not just copying and opening app

2. **Verify URL in share:**
   - Some TikTok videos might not share URL
   - Try sharing different video

3. **Check browser console:**
   - If testing in browser, open DevTools
   - Look for errors in Console tab

4. **Try this test URL manually:**
   ```
   https://your-domain.com/share?url=https://www.tiktok.com/@tiktok/video/7106594312292453675
   ```
   - Should redirect to main page with URL filled

---

### Issue 4: "This site can't be reached"

**Symptoms:**
- Error: "0.0.0.0 refused to connect"
- ERR_CONNECTION_REFUSED

**Solutions:**

✅ **This is FIXED in the latest version!**

If you still see this:

1. **Redeploy the app:**
   ```bash
   git pull  # Get latest changes
   npm run build
   # Deploy to your hosting
   ```

2. **Clear app cache:**
   - Uninstall the app from phone
   - Clear browser cache
   - Reinstall fresh

3. **Verify you're on HTTPS:**
   - PWA requires HTTPS
   - http:// won't work for share target

4. **Check deployment URL:**
   - Make sure app is deployed to public URL
   - localhost won't work for sharing

---

### Issue 5: Share works but video won't download

**Symptoms:**
- Share opens app correctly
- URL fills correctly
- But video fails to download

**Solutions:**

1. **Check internet connection:**
   - Need active internet for downloads
   - Offline only works for UI

2. **Try different video:**
   - Private videos won't work
   - Age-restricted might fail
   - Try public popular video

3. **Check API limits:**
   - Free APIs have rate limits
   - Add RapidAPI key if needed:
     ```env
     RAPIDAPI_KEY=your_key_here
     ```

4. **Verify video URL:**
   - Must be valid TikTok URL
   - Should include /video/ in path

---

## 🔍 **Debugging Steps**

### Step 1: Verify Installation

**Android:**
```
1. Long press app icon
2. Click "App info"
3. Should show package name (your domain)
4. "Open by default" should be enabled
```

**iOS:**
```
1. Long press app icon
2. Should NOT show browser icon
3. Should open in full screen (no Safari UI)
```

---

### Step 2: Test Share Manually

Visit this URL in your browser:
```
https://your-domain.com/share?url=https://www.tiktok.com/@tiktok/video/7106594312292453675
```

**Expected behavior:**
1. Shows loading screen
2. Redirects to main page
3. URL field has the TikTok link
4. Video info loads automatically

**If this doesn't work:**
- Check browser console for errors
- Verify /share page exists
- Check main page handles ?url parameter

---

### Step 3: Check Manifest

1. Open app in Chrome
2. F12 → Application tab
3. Click "Manifest" in sidebar
4. Verify:
   ```json
   {
     "share_target": {
       "action": "/share",
       "method": "GET",
       ...
     }
   }
   ```

---

### Step 4: Verify Service Worker

1. Open app in Chrome
2. F12 → Application tab
3. Click "Service Workers"
4. Should show:
   - ✅ Activated and running
   - Source: /sw.js

If not:
```javascript
// Check in Console:
navigator.serviceWorker.getRegistrations().then(registrations => {
  console.log(registrations);
});
```

---

## 📋 **Requirements Checklist**

Before share feature works:

### Server Requirements:
- [ ] Deployed to HTTPS (not HTTP)
- [ ] Valid SSL certificate
- [ ] Public URL (not localhost)
- [ ] manifest.json accessible
- [ ] Service worker registered

### App Requirements:
- [ ] PWA installed (not bookmarked)
- [ ] Opened from home screen icon
- [ ] Runs in standalone mode
- [ ] manifest.json valid
- [ ] /share page exists

### Device Requirements:
- [ ] Android 8+ OR iOS 13+
- [ ] Chrome/Edge (Android) OR Safari (iOS)
- [ ] Internet connection
- [ ] Storage permissions

---

## 🎯 **Platform-Specific Notes**

### Android (Best Support)

**Chrome/Edge:**
- ✅ Full share target support
- ✅ App appears in all share menus
- ✅ One-tap sharing
- ✅ "Always use" option available

**Setup:**
1. Install app via "Install" button
2. Share once from TikTok
3. Select "Always" when prompted
4. Future shares = one tap!

---

### iOS (Limited Support)

**Safari:**
- ⚠️ Limited share target support
- ⚠️ May need to share to Safari first
- ⚠️ No "Always use" option

**Workaround:**
1. Install app via "Add to Home Screen"
2. In TikTok, use "Copy Link"
3. Open your app from home screen
4. Paste URL manually

**OR:**
1. Share from TikTok
2. Select "Safari"
3. In Safari, tap "Open in [App Name]"

---

## 💡 **Best Practices**

### For Users:

1. **Always install properly:**
   - Use "Install" not "Bookmark"
   - Verify standalone mode

2. **Share flow:**
   - TikTok → Share → Your App
   - Wait for redirect
   - Download

3. **If share doesn't work:**
   - Fall back to copy-paste
   - Still faster than browser!

---

### For Developers:

1. **Always test on real device:**
   - Desktop simulation doesn't work
   - Need actual phone

2. **Test both platforms:**
   - Android (best support)
   - iOS (limited support)

3. **Provide fallback:**
   - Keep copy-paste method
   - Show both options in UI

4. **Monitor errors:**
   - Add error logging
   - Track share success rate

---

## 🔄 **Alternative Methods**

If share feature doesn't work:

### Method 1: Copy-Paste (Universal)
```
1. TikTok → Share → Copy Link
2. Open app
3. Paste in input field
4. Download
```

### Method 2: Share to Browser (iOS)
```
1. TikTok → Share → Safari
2. In Safari → Share → Your App
3. Download
```

### Method 3: Direct Link
```
1. Send TikTok link via message
2. Long press link
3. "Open in [Your App]"
4. Download
```

---

## 📞 **Getting Help**

### If share still doesn't work:

1. **Check the docs:**
   - MOBILE_GUIDE.md
   - MOBILE_QUICK_START.md
   - This file

2. **Verify deployment:**
   - Must be HTTPS
   - Must be public URL
   - Check manifest.json loads

3. **Test manually:**
   - Visit /share?url=... directly
   - Check browser console
   - Look for errors

4. **Try copy-paste instead:**
   - Still works great!
   - Only 1 extra step

---

## ✅ **Success Indicators**

Share is working when:

- ✅ App appears in TikTok share menu
- ✅ Tapping opens your app (not browser)
- ✅ URL auto-fills
- ✅ Video downloads successfully
- ✅ No errors in console

---

## 🎉 **Summary**

**The share feature should now work!**

**If it doesn't:**
1. Verify HTTPS deployment
2. Reinstall app properly
3. Test with manual URL
4. Use copy-paste as fallback

**Remember:**
- Android = best support
- iOS = limited, use workarounds
- HTTPS is required
- Real device testing needed

---

**Happy sharing! 🚀📱**
