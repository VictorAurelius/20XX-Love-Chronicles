# Music - Playlist Support 🎵

## 📝 Hướng dẫn

Thêm **nhiều file nhạc** vào folder này! Music player sẽ tự động shuffle/random.

**CẤU TRÚC MỚI**: Có subfolder `birthday/` cho nhạc sinh nhật riêng!

---

## 🎵 Music Folder Structure

```
public/data/music/
├── 01-di-ve-nha.mp3              # Normal playlist
├── 02-photograph.mp3             # Normal playlist
├── 03-3107.mp3                   # Normal playlist
├── 04-yeu-la-cuoi.mp3           # Normal playlist
├── 05-thinking-out-loud.mp3     # Normal playlist
├── ... (5-10 bài cho normal browsing)
└── birthday/                      # Birthday music subfolder ⭐
    ├── 01-happy-birthday.mp3     # Birthday playlist
    ├── 02-birthday-song.mp3      # Birthday playlist
    ├── 03-sinh-nhat-vui-ve.mp3  # Birthday playlist
    ├── 04-celebration.mp3        # Birthday playlist
    └── ... (3-10 bài birthday)
```

---

## 🎂 Birthday Music Subfolder (QUAN TRỌNG)

**Birthday events sẽ CHỈ phát nhạc từ folder `birthday/`!**

### Tạo subfolder:
```bash
mkdir -p public/data/music/birthday
```

### Thêm nhạc birthday:
Add **3-10 bài nhạc birthday** vào folder `birthday/`:
- Happy Birthday (Vietnamese version)
- Happy Birthday (English version)
- Birthday Celebration songs
- Upbeat birthday music
- Romantic birthday songs

### Naming convention trong `birthday/`:
```
birthday/
├── 01-happy-birthday-vietnamese.mp3
├── 02-happy-birthday-english.mp3
├── 03-sinh-nhat-vui-ve.mp3
├── 04-celebration-day.mp3
├── 05-birthday-boy-special.mp3       # Optional: Riêng cho bạn trai
├── 06-birthday-girl-special.mp3      # Optional: Riêng cho bạn gái
└── 07-birthday-acoustic.mp3
```

---

## 🎼 Music Player Behavior

### Mode 1: Normal Browsing (Playlist Mode)
**Khi**: User duyệt web bình thường, xem các events khác (không phải birthday)

**Nhạc phát**:
- ✅ Shuffle/random các bài trong `music/` root
- ❌ KHÔNG include nhạc trong `birthday/`

**Controls**:
- Play/Pause, Next/Previous, Volume, Shuffle, Repeat

**Example**:
```
Playing: "Đi Về Nhà" by Đen
Next: "Photograph" by Ed Sheeran
Next: "3107" by Duongg
...
(Không bao giờ play nhạc birthday)
```

---

### Mode 2: Birthday Events (Birthday Playlist Mode)
**Khi**: User vào/xem birthday events (sinh nhật bạn trai hoặc bạn gái)

**Nhạc phát**:
- ✅ Shuffle/random CHỈ các bài trong `birthday/`
- ❌ KHÔNG phát nhạc normal playlist

**Controls**:
- Play/Pause, Next/Previous (giữa các bài birthday), Volume
- Shuffle trong birthday playlist
- Repeat all birthday songs

**Example**:
```
User clicks "Sinh Nhật Bạn Trai" event:
→ Switch to Birthday Playlist Mode
→ Playing: "Happy Birthday Vietnamese"
   Next: "Celebration Day"
   Next: "Birthday Acoustic"
   Next: "Happy Birthday English"
   (Cycle through all birthday songs)
```

**UI Indicator**:
```
🎂 Birthday Playlist Playing
Shuffle: ON (within birthday songs)
Repeat: ALL (loop birthday playlist)
```

---

## 📋 Naming Convention

### Root level (Normal playlist):
Format: `##-song-name.mp3`
- `##`: Số thứ tự (01, 02, 03...)
- `song-name`: Tên bài hát (kebab-case)
- Extension: `.mp3`

Examples:
- ✅ `01-di-ve-nha.mp3`
- ✅ `02-photograph-ed-sheeran.mp3`
- ✅ `03-3107-duongg-nau.mp3`
- ❌ `Đi Về Nhà.mp3` (có dấu)
- ❌ `my song.mp3` (có space)

### Birthday subfolder:
Format: `##-birthday-song-name.mp3`

Examples:
- ✅ `01-happy-birthday-vietnamese.mp3`
- ✅ `02-happy-birthday-english.mp3`
- ✅ `03-sinh-nhat-vui-ve.mp3`
- ✅ `04-celebration.mp3`

---

## 💾 File Requirements

### Format:
- **MP3** (preferred) - Tương thích mọi browser
- AAC codec recommended
- Bitrate: 128-192 kbps

### Size:
- **Target**: < 5MB/file
- **Max**: 10MB/file

### Audio quality:
- Sample rate: 44100 Hz
- Channels: Stereo or Mono
- Normalize volume (tất cả bài cùng volume level)

---

## 🛠️ Compression Tips

### FFmpeg command:
```bash
# Compress to 128kbps MP3
ffmpeg -i input.mp3 -b:a 128k -ar 44100 -ac 2 output.mp3

# Normalize volume + compress
ffmpeg -i input.mp3 -af "loudnorm" -b:a 128k output.mp3
```

### Online tools:
- https://www.freeconvert.com/mp3-compressor
- https://www.mp3smaller.com/

---

## 🎯 Recommended Setup

### Option 1: Small Setup (Quick & Simple)
**Normal playlist**: 5-7 bài
**Birthday playlist**: 3-5 bài
**Total**: ~40-50MB

### Option 2: Medium Setup (Balanced)
**Normal playlist**: 8-10 bài
**Birthday playlist**: 5-7 bài
**Total**: ~60-80MB

### Option 3: Large Setup (Maximum Variety)
**Normal playlist**: 10-15 bài
**Birthday playlist**: 7-10 bài
**Total**: ~100-120MB

---

## 📊 Example Playlist (Recommended)

### Root Level - Normal Playlist (8 bài):
```
music/
├── 01-di-ve-nha-den.mp3              (Vietnamese, chill)
├── 02-3107-duongg-nau.mp3            (Vietnamese, nostalgic)
├── 03-yeu-la-cuoi-duc-phuc.mp3      (Vietnamese, happy)
├── 04-photograph-ed-sheeran.mp3      (English, timeline perfect!)
├── 05-thinking-out-loud-ed-sheeran.mp3  (English, romantic)
├── 06-all-of-me-john-legend.mp3     (English, emotional)
├── 07-perfect-ed-sheeran.mp3         (English, classic)
└── 08-river-flows-in-you-yiruma.mp3 (Instrumental, piano)
```
**Subtotal**: 8 bài × 4MB = ~32MB

### Birthday Subfolder - Birthday Playlist (5 bài):
```
birthday/
├── 01-happy-birthday-vietnamese.mp3  (Sinh nhật vui vẻ)
├── 02-happy-birthday-english.mp3     (Traditional)
├── 03-birthday-acoustic.mp3          (Romantic version)
├── 04-celebration-song.mp3           (Upbeat)
└── 05-birthday-special.mp3           (Unique pick)
```
**Subtotal**: 5 bài × 4MB = ~20MB

**TOTAL**: ~52MB (Perfect for GitHub Pages!)

---

## 🎂 Birthday Music Recommendations

### Vietnamese Birthday Songs:
1. **"Chúc Mừng Sinh Nhật"** - Various Artists (classic)
2. **"Sinh Nhật Vui Vẻ"** - Traditional Vietnamese
3. **"Một Ngày Đặc Biệt"** - Acoustic version
4. **"Birthday Acoustic"** - Romantic guitar version

### English Birthday Songs:
1. **"Happy Birthday"** - Traditional (acoustic cover)
2. **"Birthday"** - Katy Perry (upbeat, fun!)
3. **"Happy Birthday Song"** - Acoustic guitar version
4. **"Celebration"** - Kool & The Gang (classic party song)

### Instrumental:
1. **"Happy Birthday"** - Piano cover
2. **"Birthday Celebration"** - Violin + Piano
3. **"Birthday Waltz"** - Romantic instrumental

### Where to download:
- YouTube Audio Library (free, royalty-free)
- YouTube to MP3 (search "happy birthday acoustic")
- Spotify → Download as MP3 (personal use)

---

## 🎵 Music Player Features

Website sẽ có 2 playlists riêng biệt:

### Normal Playlist:
- ✅ Auto-detect tất cả MP3 trong `music/` root
- ✅ Shuffle/random order
- ✅ Next/Previous skip
- ✅ Volume control
- ✅ Repeat modes

### Birthday Playlist:
- ✅ Auto-detect tất cả MP3 trong `music/birthday/`
- ✅ Shuffle ONLY within birthday songs
- ✅ Auto-switch khi vào birthday events
- ✅ Cycle through all birthday songs
- ✅ Show special UI: "🎂 Birthday Music"

---

## 🔄 How It Works

### Scenario 1: Normal Browsing
```
User visits homepage
→ Music player loads normal playlist (8 bài từ root)
→ Random: "Photograph"
→ User clicks Next: "3107"
→ Shuffle continues...
(Birthday songs NEVER played)
```

### Scenario 2: Click Birthday Event
```
User clicks "Sinh Nhật Bạn Trai" event card
→ Pause normal playlist
→ Load birthday playlist (5 bài từ birthday/)
→ Random: "Happy Birthday Vietnamese"
→ User clicks Next: "Celebration Song"
→ User clicks Next: "Birthday Acoustic"
→ When all 5 songs done → Loop back to first
```

### Scenario 3: Exit Birthday Event
```
User closes birthday event
→ Stop birthday playlist
→ Resume normal playlist
→ Continue from where it left off ("3107")
```

### Scenario 4: Birthday Date Auto-play
```
Today = 9/30 (Sinh nhật bạn trai)
→ Page loads
→ Auto-switch to Birthday Playlist Mode
→ Random song from birthday/
→ Show birthday banner on homepage
```

---

## ✅ Checklist

### Root Playlist:
- [ ] Chọn 5-10 bài romantic (Vietnamese + English)
- [ ] Rename theo convention (##-song-name.mp3)
- [ ] Compress < 5MB each
- [ ] Normalize volume
- [ ] Add vào `music/` root

### Birthday Playlist:
- [ ] Tạo folder `music/birthday/`
- [ ] Chọn 3-7 bài birthday (Vietnamese + English + Instrumental)
- [ ] Rename theo convention
- [ ] Compress < 5MB each
- [ ] Normalize volume
- [ ] Add vào `music/birthday/`

### Verify:
- [ ] Check folder structure correct
- [ ] Test play files locally
- [ ] Total size < 100MB
- [ ] Xóa README.md này khi xong

---

## ⚠️ QUAN TRỌNG

1. **Separation is key**:
   - Normal songs → `music/` root ONLY
   - Birthday songs → `music/birthday/` ONLY
   - KHÔNG mix!

2. **Birthday folder is mandatory** nếu muốn birthday music:
   - Phải có ít nhất 1 bài trong `birthday/`
   - Nếu không có → Birthday events sẽ silent (không có nhạc)

3. **Both playlists shuffle independently**:
   - Normal playlist shuffle riêng
   - Birthday playlist shuffle riêng
   - Không overlap

---

**Add your favorite songs and celebrate every moment!** 🎵💕🎂
**Xóa README.md này sau khi add xong nhạc!**
