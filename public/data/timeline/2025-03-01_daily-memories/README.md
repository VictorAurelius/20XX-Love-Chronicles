# Kỉ Niệm Đời Thường (Daily Memories) 💕📸

**Event đặc biệt** - Folder này chứa nhiều ảnh và video nhất trong timeline!

---

## 🎯 Về Event Này

**Daily Memories** là nơi lưu giữ những khoảnh khắc đời thường, hàng ngày của couple:
- Những buổi hẹn hò bình thường
- Ăn uống, đi chơi
- Selfies, ảnh đời thường
- Video ngắn ghi lại những giây phút đáng nhớ

→ Event này sẽ có **nhiều ảnh và video nhất** so với các events khác!

---

## 📊 Expected Media Count

### Minimal Setup:
- **Photos**: 20-30 ảnh
- **Videos**: 2-3 videos (vertical format 9:16)
- **Total size**: ~60-100MB

### Balanced Setup:
- **Photos**: 30-50 ảnh
- **Videos**: 3-5 videos
- **Total size**: ~100-150MB

### Full Setup:
- **Photos**: 50-100 ảnh
- **Videos**: 5-10 videos
- **Total size**: ~150-300MB

**Recommended**: Start với 20-30 ảnh + 2-3 videos, sau đó add dần!

---

## 🖼️ Gallery Features (Special for This Event)

### 1. Advanced Lazy Loading
```
Không load hết tất cả ảnh cùng lúc!
→ Load 5 ảnh đầu tiên
→ Scroll xuống → Load thêm 5 ảnh nữa
→ Infinite scroll hoặc "Load More" button
→ Performance tốt, không lag!
```

### 2. Masonry Grid Layout
```
Pinterest-style photo grid:
┌────┐ ┌────┐ ┌────┐
│    │ │    │ │    │
│ 1  │ │ 2  │ │ 3  │
└────┘ │    │ └────┘
┌────┐ └────┘ ┌────┐
│    │ ┌────┐ │    │
│ 4  │ │ 5  │ │ 6  │
│    │ │    │ │    │
└────┘ └────┘ └────┘
```
**Benefits**:
- Tận dụng không gian tốt
- Không bị khoảng trống
- Responsive trên mọi màn hình
- Đẹp & professional

### 3. Separate Video Carousel
```
Videos có section riêng (không mix với photos):
→ Vertical video cards (9:16 format)
→ Swiper.js carousel
→ Smooth swipe navigation
→ Lazy load videos (load khi cần)
→ Tap to play/pause
→ Desktop: Centered (max-width 500px)
→ Mobile: Full-width
```

---

## 📂 Folder Structure

```
2025-03-01_daily-memories/
├── cover.jpg                      # Cover image (BẮT BUỘC)
├── photos/
│   ├── 01-breakfast-date.jpg
│   ├── 02-coffee-shop.jpg
│   ├── 03-sunset-selfie.jpg
│   ├── 04-cooking-together.jpg
│   ├── 05-movie-night.jpg
│   ├── ...
│   └── 30-rainy-day.jpg
├── videos/
│   ├── 01-funny-moment.mp4
│   ├── 02-dancing.mp4
│   └── 03-saying-i-love-you.mp4
└── note.txt                       # Optional description
```

---

## 📸 Photo Requirements

### Format:
- **JPG** (preferred for photos)
- **PNG** (nếu có transparency, nhưng size lớn hơn)
- **WebP** (best compression, modern browsers)

### Resolution:
- **Target**: 1920x1080 (Full HD) hoặc nhỏ hơn
- **Max**: 2560x1440 (2K)
- **Min**: 1280x720 (HD)

→ **Không cần 4K!** Compress để giảm size, vẫn đẹp!

### Size per photo:
- **Target**: < 500KB
- **Max**: 1MB
- **Recommended**: 200-400KB

### Quality:
- JPG quality: 80-85%
- WebP quality: 80%

---

## 🎥 Video Requirements

### Format:
- **MP4** (H.264 codec)
- **Aspect Ratio**: 9:16 (VERTICAL - like TikTok/Instagram Reels)
- **Resolution**: 1080x1920 (Full HD vertical)

### Size per video:
- **Target**: < 10MB per video
- **Max**: 20MB per video
- **Duration**: 10-60 seconds recommended

### Compression:
```bash
ffmpeg -i input.mp4 -vf "scale=1080:1920" -b:v 2M -b:a 128k output.mp4
```

---

## 🛠️ Compression Tools

### For Photos:
1. **TinyPNG** (online):
   - https://tinypng.com/
   - Upload → Auto compress → Download
   - Giảm 50-70% size, vẫn giữ chất lượng

2. **ImageOptim** (Mac):
   - https://imageoptim.com/
   - Drag & drop → Auto optimize

3. **GIMP** (free desktop app):
   - Open image
   - Export As → JPG
   - Quality: 80-85

4. **FFmpeg** (command line):
   ```bash
   # Convert to WebP (best compression)
   ffmpeg -i input.jpg -q:v 80 output.webp
   ```

### For Videos:
```bash
# Compress to vertical 1080x1920, 2Mbps
ffmpeg -i input.mp4 \
  -vf "scale=1080:1920" \
  -b:v 2M \
  -b:a 128k \
  output.mp4
```

Online tools:
- https://www.freeconvert.com/video-compressor
- https://www.videosmaller.com/

---

## 📝 Naming Convention

### Cover Image:
```
cover.jpg         ← BẮT BUỘC! (Event thumbnail)
```

### Photos:
```
Format: photos/##-descriptive-name.jpg

Examples:
photos/01-breakfast-date.jpg
photos/02-coffee-shop-selfie.jpg
photos/03-sunset-walk.jpg
photos/04-cooking-together.jpg
...
photos/30-rainy-day-cuddle.jpg
```

### Videos:
```
Format: videos/##-descriptive-name.mp4

Examples:
videos/01-funny-dance.mp4
videos/02-singing-together.mp4
videos/03-surprise-moment.mp4
```

### Note (optional):
```
note.txt          ← Mô tả chi tiết về event này
```

**Rules**:
- ✅ Start with number: `01-`, `02-`, etc.
- ✅ kebab-case (lowercase, hyphens)
- ✅ No Vietnamese diacritics
- ✅ Descriptive names (giúp nhớ nội dung)
- ❌ NO spaces: `my photo.jpg` ❌
- ❌ NO diacritics: `ảnh đẹp.jpg` ❌

---

## 💡 Tips for Choosing Photos

### Good Daily Memories Photos:
- 📸 Candid moments (tự nhiên, không pose)
- ☕ Cafe dates, restaurant meals
- 🌅 Sunset/sunrise selfies
- 🏠 Home activities (cooking, watching TV)
- 🚗 Car selfies, road trips
- 🛍️ Shopping together
- 🎮 Gaming, hobbies together
- 💤 Lazy weekend mornings
- 🎉 Small celebrations (not major events)

### Avoid:
- ❌ Blurry, dark, bad lighting
- ❌ Duplicate similar photos (chọn 1 ảnh đẹp nhất)
- ❌ Photos with sensitive/private info
- ❌ Photos better suited for other events (e.g., birthday photos → birthday event)

---

## 🎬 Tips for Choosing Videos

### Good Daily Memories Videos:
- 🎤 Singing/dancing together (fun moments)
- 🍳 Cooking time-lapse
- 😂 Funny pranks, jokes
- 💕 Saying "I love you" spontaneously
- 🐕 Playing with pets (if any)
- 🚗 Road trip clips
- 🎮 Gaming reactions
- ☔ Rainy day cozy moments

### Requirements:
- **MUST be vertical** (9:16 format) - record with phone held vertically
- 10-60 seconds duration
- Good lighting, clear audio
- Compress to < 10MB

---

## 📦 Storage Estimates

### 20 photos + 2 videos:
```
Photos: 20 × 400KB = 8MB
Videos: 2 × 8MB = 16MB
Total: ~24MB ✅ Lightweight!
```

### 30 photos + 3 videos:
```
Photos: 30 × 400KB = 12MB
Videos: 3 × 8MB = 24MB
Total: ~36MB ✅ Balanced!
```

### 50 photos + 5 videos:
```
Photos: 50 × 400KB = 20MB
Videos: 5 × 8MB = 40MB
Total: ~60MB ✅ Still OK!
```

### 100 photos + 10 videos:
```
Photos: 100 × 400KB = 40MB
Videos: 10 × 8MB = 80MB
Total: ~120MB ⚠️ Getting large!
```

**Recommended**: Start với 20-30 photos + 2-3 videos (~40MB). Có thể add thêm sau!

---

## ⚡ Performance Optimization

### Why This Event Needs Special Handling:

```
Other events: 5-10 photos → Load all at once ✅
Daily Memories: 20-100 photos → CANNOT load all! ❌
```

### Solutions Implemented:

1. **Lazy Loading**:
   ```
   Initial load: 5 photos only
   User scrolls → Load next 5
   User scrolls → Load next 5
   ...
   → Smooth, no lag!
   ```

2. **Masonry Grid**:
   ```
   Optimized layout
   → No wasted space
   → Professional look
   → Responsive
   ```

3. **Video Separation**:
   ```
   Videos in separate carousel
   → Don't block photo loading
   → Load only when user swipes
   → Smooth playback
   ```

4. **Progressive Image Loading**:
   ```
   Show blur placeholder first
   → Load actual image
   → Smooth transition
   → Better UX
   ```

---

## ✅ Checklist

- [ ] Create `cover.jpg` for event thumbnail
- [ ] Collect 20-30 daily life photos
  - [ ] Cafe/restaurant dates
  - [ ] Home activities
  - [ ] Selfies together
  - [ ] Candid moments
- [ ] Collect 2-3 vertical videos (9:16)
  - [ ] Fun/funny moments
  - [ ] Singing/dancing
  - [ ] Sweet messages
- [ ] Compress all photos < 500KB each
- [ ] Compress all videos < 10MB each
- [ ] Rename files according to convention
- [ ] Organize into `photos/` and `videos/` subfolders
- [ ] Create `note.txt` with event description (optional)
- [ ] Test locally (check total size ~40MB or less)
- [ ] Delete this README when done

---

## 🎨 Display Preview

### Desktop View:
```
┌─────────────────────────────────────────────┐
│  Kỉ Niệm Đời Thường 💕                     │
│  ─────────────────────────────────────      │
│                                             │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐              │
│  │ 1  │ │ 2  │ │ 3  │ │ 4  │              │ ← Masonry grid
│  └────┘ │    │ └────┘ └────┘              │
│  ┌────┐ └────┘ ┌────┐ ┌────┐              │
│  │ 5  │ ┌────┐ │ 6  │ │ 7  │              │
│  │    │ │ 8  │ │    │ └────┘              │
│  └────┘ └────┘ └────┘                      │
│                                             │
│  [Load More] ← Button to load next 5       │
│                                             │
│  Videos 🎥                                  │
│  ──────────────────────────────────         │
│  ┌──────┐ ┌──────┐ ┌──────┐               │
│  │Video1│ │Video2│ │Video3│               │ ← Swiper carousel
│  │ 9:16 │ │ 9:16 │ │ 9:16 │               │
│  └──────┘ └──────┘ └──────┘               │
└─────────────────────────────────────────────┘
```

### Mobile View:
```
┌──────────────────┐
│ Kỉ Niệm Đời Thường│
│ ──────────────    │
│                   │
│ ┌────┐ ┌────┐    │
│ │ 1  │ │ 2  │    │ ← 2 columns
│ └────┘ │    │    │
│ ┌────┐ └────┘    │
│ │ 3  │ ┌────┐    │
│ │    │ │ 4  │    │
│ └────┘ └────┘    │
│                   │
│ [Load More]       │
│                   │
│ Videos 🎥         │
│ ──────────────    │
│ ┌──────────────┐  │
│ │   Video 1    │  │ ← Full-width
│ │   (9:16)     │  │   vertical
│ │              │  │
│ └──────────────┘  │
│ ← Swipe →         │
└──────────────────┘
```

---

## 🚀 Ready to Add Photos & Videos!

1. **Collect** your favorite daily life photos & vertical videos
2. **Compress** to reduce file sizes
3. **Rename** according to convention
4. **Organize** into `photos/` and `videos/` subfolders
5. **Test** locally to check performance
6. **Enjoy** the beautifully displayed memories! 💕

---

**This is your biggest event - make it special with lots of sweet daily moments!** 📸💕

Delete this README.md after adding your media files.
