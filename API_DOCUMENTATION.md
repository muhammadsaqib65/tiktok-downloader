# 📡 API Documentation - TikTok Downloader

Complete API reference for developers who want to integrate or extend the TikTok downloader functionality.

## Base URL

```
Development: http://localhost:3000
Production:  https://your-domain.com
```

## Authentication

No authentication required for basic usage. RapidAPI key is only needed server-side for enhanced reliability.

---

## Endpoints

### 1. Download TikTok Video

**POST** `/api/download`

Download a TikTok video without watermark.

#### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "url": "https://www.tiktok.com/@username/video/1234567890"
}
```

#### Response

**Success (200):**
```json
{
  "success": true,
  "data": {
    "downloadUrl": "https://v16.tiktokcdn.com/...",
    "hdDownloadUrl": "https://v16.tiktokcdn.com/...",
    "title": "Amazing video title",
    "author": "username",
    "thumbnail": "https://p16.tiktokcdn.com/...",
    "music": "https://sf16.tiktokcdn.com/..."
  }
}
```

**Error (400):**
```json
{
  "error": "Invalid TikTok URL"
}
```

**Error (500):**
```json
{
  "error": "Failed to download video. Please check the URL and try again.",
  "details": "Error message details"
}
```

#### Example Usage

**cURL:**
```bash
curl -X POST http://localhost:3000/api/download \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.tiktok.com/@tiktok/video/7106594312292453675"}'
```

**JavaScript (Fetch):**
```javascript
const response = await fetch('http://localhost:3000/api/download', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://www.tiktok.com/@tiktok/video/7106594312292453675'
  })
});

const data = await response.json();
console.log(data);
```

**Python:**
```python
import requests

url = "http://localhost:3000/api/download"
payload = {
    "url": "https://www.tiktok.com/@tiktok/video/7106594312292453675"
}

response = requests.post(url, json=payload)
data = response.json()
print(data)
```

**Node.js:**
```javascript
const axios = require('axios');

async function downloadTikTok(tiktokUrl) {
  try {
    const response = await axios.post('http://localhost:3000/api/download', {
      url: tiktokUrl
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

downloadTikTok('https://www.tiktok.com/@tiktok/video/7106594312292453675');
```

---

### 2. Get Download History

**GET** `/api/download`

Retrieve recent download history from the database.

#### Request

No body required.

#### Response

**Success (200):**
```json
{
  "success": true,
  "downloads": [
    {
      "id": 1,
      "videoUrl": "https://www.tiktok.com/@user/video/123",
      "videoTitle": "Cool video",
      "author": "username",
      "downloadedAt": "2026-01-15T10:30:00.000Z"
    },
    {
      "id": 2,
      "videoUrl": "https://www.tiktok.com/@user2/video/456",
      "videoTitle": "Another video",
      "author": "user2",
      "downloadedAt": "2026-01-15T09:15:00.000Z"
    }
  ]
}
```

**Error (500):**
```json
{
  "error": "Failed to fetch downloads"
}
```

#### Example Usage

**cURL:**
```bash
curl http://localhost:3000/api/download
```

**JavaScript:**
```javascript
const response = await fetch('http://localhost:3000/api/download');
const data = await response.json();
console.log(data.downloads);
```

---

### 3. Health Check

**GET** `/api/health`

Check if the API is running.

#### Response

**Success (200):**
```json
{
  "status": "ok"
}
```

#### Example Usage

```bash
curl http://localhost:3000/api/health
```

---

## Response Objects

### VideoData Object

```typescript
interface VideoData {
  downloadUrl: string;      // Direct download link (SD, no watermark)
  hdDownloadUrl: string;    // HD download link (no watermark)
  title: string;            // Video title/caption
  author: string;           // Creator username
  thumbnail: string;        // Video thumbnail URL
  music: string;            // Music/audio URL
}
```

### Download Record Object

```typescript
interface DownloadRecord {
  id: number;               // Unique ID
  videoUrl: string;         // Original TikTok URL
  videoTitle: string;       // Video title
  author: string;           // Creator username
  downloadedAt: string;     // ISO timestamp
}
```

---

## Error Handling

### Error Response Format

```json
{
  "error": "Human-readable error message",
  "details": "Technical details (optional)"
}
```

### Common Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| 400  | Invalid URL | Check TikTok URL format |
| 404  | Video not found | Verify video exists and is public |
| 429  | Rate limit exceeded | Wait before retrying |
| 500  | Server error | Try again or contact support |

---

## Rate Limiting

### Free API (Default)

- **Rate**: ~100 requests/hour
- **Daily**: ~500-1000 requests
- **Throttling**: Automatic backoff

### RapidAPI (Optional)

Depends on your plan:
- **Free**: 100-500 requests/month
- **Basic**: 10,000 requests/month
- **Pro**: 100,000+ requests/month

---

## Integration Examples

### React Component

```jsx
import { useState } from 'react';

export default function TikTokDownloader() {
  const [url, setUrl] = useState('');
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      setVideo(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        value={url} 
        onChange={(e) => setUrl(e.target.value)}
        placeholder="TikTok URL"
      />
      <button onClick={handleDownload} disabled={loading}>
        {loading ? 'Loading...' : 'Download'}
      </button>
      {video && (
        <div>
          <h3>{video.title}</h3>
          <p>By: {video.author}</p>
          <a href={video.downloadUrl} download>Download SD</a>
          <a href={video.hdDownloadUrl} download>Download HD</a>
        </div>
      )}
    </div>
  );
}
```

### Express.js Proxy

```javascript
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/tiktok/download', async (req, res) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/download',
      { url: req.body.url }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4000);
```

### Chrome Extension

```javascript
// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'download') {
    fetch('http://localhost:3000/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: request.url })
    })
    .then(res => res.json())
    .then(data => sendResponse(data))
    .catch(error => sendResponse({ error: error.message }));
    
    return true; // Keep channel open
  }
});
```

---

## Database Schema

### Downloads Table

```sql
CREATE TABLE downloads (
  id SERIAL PRIMARY KEY,
  video_url TEXT NOT NULL,
  video_title TEXT,
  author TEXT,
  downloaded_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

### Query Examples

**Get all downloads:**
```sql
SELECT * FROM downloads ORDER BY downloaded_at DESC;
```

**Get downloads by author:**
```sql
SELECT * FROM downloads WHERE author = 'username' ORDER BY downloaded_at DESC;
```

**Count downloads per author:**
```sql
SELECT author, COUNT(*) as count 
FROM downloads 
GROUP BY author 
ORDER BY count DESC;
```

**Get recent downloads (last 24h):**
```sql
SELECT * FROM downloads 
WHERE downloaded_at > NOW() - INTERVAL '24 hours'
ORDER BY downloaded_at DESC;
```

---

## Advanced Usage

### Batch Download

```javascript
async function batchDownload(urls) {
  const results = await Promise.all(
    urls.map(url => 
      fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      }).then(r => r.json())
    )
  );
  return results;
}

// Usage
const urls = [
  'https://www.tiktok.com/@user1/video/123',
  'https://www.tiktok.com/@user2/video/456'
];
const videos = await batchDownload(urls);
```

### Download with Progress

```javascript
async function downloadWithProgress(videoUrl, onProgress) {
  const response = await fetch(videoUrl);
  const reader = response.body.getReader();
  const contentLength = +response.headers.get('Content-Length');
  
  let receivedLength = 0;
  let chunks = [];
  
  while(true) {
    const {done, value} = await reader.read();
    if (done) break;
    
    chunks.push(value);
    receivedLength += value.length;
    
    // Report progress
    onProgress(receivedLength / contentLength * 100);
  }
  
  const blob = new Blob(chunks);
  return blob;
}
```

### Webhook Integration

```javascript
// Send download notification to webhook
app.post('/api/download', async (req, res) => {
  // ... download logic ...
  
  // Notify webhook
  await fetch('https://your-webhook.com/notify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'video_downloaded',
      data: videoData
    })
  });
  
  res.json({ success: true, data: videoData });
});
```

---

## Security Best Practices

1. **Never expose RapidAPI key** to client-side
2. **Validate URLs** before processing
3. **Rate limit** your endpoints
4. **Sanitize inputs** to prevent injection
5. **Use HTTPS** in production
6. **Implement CORS** appropriately

### Example: Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/download', limiter);
```

---

## Testing

### Unit Tests

```javascript
describe('TikTok Download API', () => {
  it('should download video', async () => {
    const response = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        url: 'https://www.tiktok.com/@tiktok/video/7106594312292453675' 
      })
    });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.downloadUrl).toBeTruthy();
  });
  
  it('should reject invalid URL', async () => {
    const response = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'invalid-url' })
    });
    
    expect(response.status).toBe(400);
  });
});
```

---

## Support

For issues or questions:
- Check the main README.md
- Review error messages
- Test with different URLs
- Verify API keys (if using RapidAPI)

---

**Built with Next.js App Router and PostgreSQL**
