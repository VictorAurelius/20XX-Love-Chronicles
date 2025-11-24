# Data Folder Structure

Đây là thư mục chứa tất cả media files (ảnh, video, nhạc) cho website.

## 📁 Cấu trúc

```
public/data/
├── timeline/              # Events timeline (6 folders)
│   ├── 2024-11-21_before-confession/
│   ├── 2025-01-20_confession-day/
│   ├── 2025-03-01_memories-before-birthday/
│   ├── 2025-11-01_trip-ninh-binh/
│   ├── 2025-09-30_boyfriend-birthday/
│   └── 2025-12-10_girlfriend-birthday/
├── avatars/               # Avatar couple
│   ├── avatar-boy.jpg
│   └── avatar-girl.jpg
├── backgrounds/           # Background images (optional)
│   └── hero-bg.jpg
└── music/                 # Music files (optional) - SUPPORT MULTIPLE SONGS!
    ├── 01-di-ve-nha.mp3
    ├── 02-photograph.mp3
    ├── 03-3107.mp3
    ├── 04-yeu-la-cuoi.mp3
    ├── ... (add as many as you want!)
    └── birthday-special.mp3
```

## 🚀 Quy trình thêm media

### 1. Event folders (đã rename xong!)
✅ Các folders đã được rename với ngày thực tế:
- `2024-11-21_before-confession` ✅
- `2025-01-20_confession-day` ✅
- `2025-03-01_memories-before-birthday` ✅
- `2025-11-01_trip-ninh-binh` ✅
- `2025-09-30_boyfriend-birthday` ✅
- `2025-12-10_girlfriend-birthday` ✅ (Special event!)

### 2. Thêm files vào mỗi event folder

Mỗi folder cần:
- ✅ **cover.jpg** (BẮT BUỘC) - Ảnh đại diện
- **01.jpg, 02.jpg, 03.jpg...** - Ảnh theo thứ tự (số lượng tùy ý)
- **video-01.mp4, video-02.mp4** - Videos vertical 9:16 (optional)
- **note.txt** - Ghi chú, lời nhắn (optional)

### 3. Optimize media trước khi add

**Ảnh**:
- Tools: TinyPNG, Squoosh, ImageOptim
- Target: 1-2MB/ảnh
- Format: JPG (photos), PNG (graphics)

**Video**:
- Tools: HandBrake, FFmpeg
- Target: 15-25MB/video
- Format: MP4 (H.264), vertical 1080x1920

### 4. Xóa README files

Sau khi hiểu rõ structure và đã add files, xóa tất cả README.md trong các folders!

## ⚙️ Auto-generate

Khi bạn thêm xong files và chạy build:
```bash
npm run preexport
```

Script sẽ tự động:
- Scan tất cả folders trong `timeline/`
- Đếm số ảnh/video trong mỗi folder
- Generate `src/data/timeline-data.json`
- Không cần edit JSON manually!

## 📊 Storage estimate

- **Ảnh**: ~57 ảnh × 1-2MB = ~57-114MB
- **Videos**: ~12 videos × 20MB = ~240MB
- **Total**: ~300-350MB (OK cho GitHub Pages < 1GB)

## ❗ Important Notes

1. **Naming convention**:
   - Folders: `YYYY-MM-DD_event-slug` (kebab-case, no Vietnamese)
   - Images: `cover.jpg`, `01.jpg`, `02.jpg`...
   - Videos: `video-01.mp4`, `video-02.mp4`...

2. **Số lượng flexible**:
   - Không bắt buộc phải có đúng số ảnh/video đã nêu
   - Script tự động đếm actual files
   - Có thể có nhiều hơn hoặc ít hơn, code sẽ handle

3. **Required vs Optional**:
   - Required: `cover.jpg` trong mỗi event folder
   - Optional: Tất cả files khác (videos, note.txt, avatars, music)

## 🎯 Checklist

- [ ] Rename event folders thành ngày chính xác
- [ ] Thêm cover.jpg vào tất cả 6 events
- [ ] Thêm ảnh vào mỗi event
- [ ] Optimize ảnh với TinyPNG
- [ ] Thêm videos (optional)
- [ ] Compress videos với HandBrake
- [ ] Thêm avatars (avatar-boy.jpg, avatar-girl.jpg)
- [ ] Thêm note.txt nếu muốn
- [ ] Xóa tất cả README.md files
- [ ] Run `npm run preexport` để test

---

**Ready to start? Add your photos and videos, then let the magic happen!** ✨
