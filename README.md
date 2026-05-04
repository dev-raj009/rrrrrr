# Lalit KGS Proxy — Next.js 14

Ye ek **server-side proxy** hai jo real Lalit KGS API ke saare secret credentials
(secret header, HMAC signature, AES key) ko **browser se completely hide** karta hai.

Frontend sirf `/api/proxy/*` endpoints call karta hai — koi secret exposed nahi hota.

---

## Project Structure

```
src/
  app/
    api/proxy/
      route.js                          → GET /  (health)
      batch_list/route.js               → GET /batch_list
      classroom/[course_id]/route.js    → GET /{course_id}/classroom
      lesson/[lesson_id]/route.js       → GET /{lesson_id}/lesson
      video/[video_id]/route.js         → GET /Sunny_Ji/{video_id}
      clear_cache/route.js              → GET /dev/clear_cache
  lib/
    proxyFetch.js                       → Core auth logic (HMAC sign + secret header)
```

---

## Local Setup

```bash
npm install
npm run dev
# Open: http://localhost:3000
```

---

## Vercel Deploy (Step by Step)

### 1. GitHub pe push karo
```bash
git init
git add .
git commit -m "init proxy"
git remote add origin https://github.com/YOUR_USER/lalit-kgs-proxy.git
git push -u origin main
```

### 2. Vercel pe import karo
- vercel.com → New Project → Import GitHub repo
- Framework: **Next.js** (auto detect hoga)
- Root Directory: `/` (default)

### 3. Environment Variables add karo
Vercel dashboard → Settings → Environment Variables:

| Key | Value |
|-----|-------|
| `TARGET_API` | `https://lalitkgs-q3ay.onrender.com` |
| `SECRET_HEADER` | `LALIT_BHAI_KA_SECRET_999` |
| `SIGNATURE_SECRET` | `Spidy_Universe_Ultimate_Secret_999` |
| `AES_SECRET_KEY` | `LalitOfficial_32BytesSecureKey!!` |

### 4. Deploy!
Automatically deploy hoga. Done ✅

---

## Frontend se kaise call karo

```js
// Pehle — real API directly (SECRET EXPOSED ❌)
fetch("https://lalitkgs-q3ay.onrender.com/batch_list", {
  headers: { "x-secret": "LALIT_BHAI_KA_SECRET_999" }
})

// Ab — proxy se (SAFE ✅)
fetch("/api/proxy/batch_list")
fetch("/api/proxy/classroom/NDA2025_BATCH1")
fetch("/api/proxy/lesson/lesson_abc123")
fetch("/api/proxy/video/vid_xyz789")
fetch("/api/proxy/clear_cache")
```

---

## Security Notes

- `.env.local` is gitignored — secrets never go to GitHub
- Vercel env vars are server-only — never sent to browser
- HMAC signature auto-generated server-side per request
- Frontend ko sirf clean REST endpoints milte hain
