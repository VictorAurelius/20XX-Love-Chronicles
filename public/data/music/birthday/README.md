# Birthday Music Folder 🎂🎵

Folder này chứa **nhạc sinh nhật riêng** cho birthday events!

---

## 🎯 Mục đích

Khi user vào/xem birthday events (sinh nhật bạn trai hoặc bạn gái), music player sẽ:
- ❌ KHÔNG phát nhạc playlist bình thường
- ✅ CHỈ shuffle/random các bài trong folder này
- 🔁 Loop all birthday songs

---

## 📋 Thêm nhạc vào folder này

### Số lượng recommended:
- **Minimum**: 3 bài (để có variety)
- **Optimal**: 5-7 bài (balance giữa variety và storage)
- **Maximum**: 10+ bài (nếu muốn cực kỳ đa dạng)

### Loại nhạc nên có:
1. **Happy Birthday songs** (Vietnamese + English)
2. **Celebration songs** (upbeat, fun)
3. **Romantic birthday songs** (acoustic, soft)
4. **Instrumental versions** (piano, guitar)

---

## 🎵 Gợi ý bài hát

### Vietnamese:
- "Chúc Mừng Sinh Nhật" (traditional)
- "Sinh Nhật Vui Vẻ" (various artists)
- "Một Ngày Đặc Biệt" (acoustic)
- "Happy Birthday" (Vietnamese cover)

### English:
- "Happy Birthday" (acoustic cover)
- "Birthday" - Katy Perry (upbeat!)
- "Birthday Song" - 2 Chainz ft. Kanye West (fun)
- "Celebration" - Kool & The Gang (classic)

### Instrumental:
- "Happy Birthday" - Piano version
- "Birthday Celebration" - Violin + Piano
- "Birthday Waltz" - Romantic instrumental

---

## 📂 Naming Convention

Format: `##-song-name.mp3`

### Examples:
```
birthday/
├── 01-happy-birthday-vietnamese.mp3
├── 02-happy-birthday-english.mp3
├── 03-celebration-kool-and-the-gang.mp3
├── 04-birthday-acoustic.mp3
├── 05-sinh-nhat-vui-ve.mp3
├── 06-birthday-piano.mp3
└── 07-birthday-katy-perry.mp3
```

### Rules:
- ✅ Bắt đầu với số thứ tự: `01-`, `02-`, `03-`...
- ✅ kebab-case (dấu gạch ngang, lowercase)
- ✅ No Vietnamese diacritics
- ✅ Extension: `.mp3`
- ❌ KHÔNG có space: `my song.mp3` ❌
- ❌ KHÔNG có dấu: `Chúc Mừng.mp3` ❌

---

## 💾 File Requirements

### Format:
- **MP3** (preferred)
- AAC codec
- Bitrate: 128-192 kbps

### Size:
- **Target**: < 5MB/file
- **Max**: 10MB/file

### Quality:
- Sample rate: 44100 Hz
- Channels: Stereo (hoặc Mono để giảm size)
- **QUAN TRỌNG**: Normalize volume!
  - Tất cả bài trong folder này nên có volume tương đương
  - Tránh bài này to, bài kia nhỏ

---

## 🛠️ Compress & Normalize

### Using FFmpeg:
```bash
# Compress to 128kbps + normalize
ffmpeg -i input.mp3 -af "loudnorm" -b:a 128k output.mp3
```

### Using Audacity:
1. Open song
2. Effect → Normalize (set to -1.0 dB)
3. File → Export → MP3 (128-192 kbps)

### Online tools:
- https://www.freeconvert.com/mp3-compressor
- https://www.mp3smaller.com/

---

## 🎂 Where to Download Birthday Music

### Free & Legal:
1. **YouTube Audio Library**
   - https://studio.youtube.com/channel/UC.../music
   - Search: "birthday music", "celebration"
   - Royalty-free!

2. **Free Music Archive**
   - https://freemusicarchive.org/
   - Search: "birthday", "celebration"

3. **Incompetech** (Kevin MacLeod)
   - https://incompetech.com/
   - Many free music, attribute required

### YouTube to MP3:
- Search: "happy birthday acoustic cover"
- Search: "sinh nhật vui vẻ"
- Search: "birthday celebration instrumental"
- Use any YouTube to MP3 converter
- **Note**: For personal use only!

---

## 🎼 How This Folder is Used

### When user browses normally:
```
Music player plays from music/ root
→ "Đi Về Nhà", "Photograph", "3107"...
→ Birthday songs NEVER play
```

### When user clicks birthday event:
```
User clicks "Sinh Nhật Bạn Trai"
→ Switch to Birthday Playlist Mode
→ Shuffle songs in music/birthday/
→ Play: "Happy Birthday Vietnamese"
→ Next: "Celebration"
→ Next: "Birthday Acoustic"
→ Loop back to first song
```

### When user exits birthday event:
```
User closes birthday modal
→ Switch back to Normal Playlist
→ Resume: "Đi Về Nhà" (where it left off)
```

---

## ✅ Checklist

- [ ] Chọn 5-7 bài birthday
  - [ ] 2-3 bài Vietnamese
  - [ ] 2-3 bài English
  - [ ] 1-2 bài instrumental
- [ ] Download/collect songs
- [ ] Compress < 5MB each
- [ ] Normalize volume (all same level)
- [ ] Rename theo convention (##-song-name.mp3)
- [ ] Add vào folder này
- [ ] Test play locally
- [ ] Total size: ~20-40MB (OK!)
- [ ] Xóa README.md này khi xong

---

## 📊 Recommended Setup

### Minimal (3 bài, ~12MB):
```
01-happy-birthday-vietnamese.mp3
02-happy-birthday-english.mp3
03-celebration.mp3
```

### Balanced (5 bài, ~20MB):
```
01-happy-birthday-vietnamese.mp3
02-happy-birthday-english.mp3
03-sinh-nhat-vui-ve.mp3
04-birthday-acoustic.mp3
05-celebration-song.mp3
```

### Full (7 bài, ~28MB):
```
01-happy-birthday-vietnamese.mp3
02-happy-birthday-english.mp3
03-sinh-nhat-vui-ve.mp3
04-birthday-acoustic.mp3
05-celebration-kool-and-the-gang.mp3
06-birthday-piano.mp3
07-birthday-katy-perry.mp3
```

---

## ⚠️ QUAN TRỌNG

1. **Phải có ít nhất 1 bài** trong folder này!
   - Nếu folder trống → Birthday events sẽ silent (không nhạc)

2. **Shuffle works within this folder**:
   - Player sẽ random order
   - Loop all songs
   - Không lặp lại ngay bài vừa phát

3. **Separate from normal playlist**:
   - Nhạc trong đây KHÔNG bao giờ phát khi browse bình thường
   - CHỈ phát khi vào birthday events!

---

**Add your favorite birthday songs and make birthdays special!** 🎂🎵💕
**Xóa README.md này sau khi add xong nhạc!**
