# Data Folder Structure

Đây là thư mục chứa tất cả media files (ảnh, video, nhạc) cho website.

## 📁 Cấu trúc

```
public/data/
├── timeline/              # Events timeline (6 folders)
│   ├── 2024-01-01_before-confession/
│   ├── 2024-02-01_confession-day/
│   ├── 2024-03-01_memories-before-birthday/
│   ├── 2024-08-01_trip-ninh-binh/
│   ├── 2024-09-30_boyfriend-birthday/
│   └── 2024-12-01_girlfriend-birthday/
├── avatars/               # Avatar couple
│   ├── avatar-boy.jpg
│   └── avatar-girl.jpg
├── backgrounds/           # Background images (optional)
│   └── hero-bg.jpg
└── music/                 # Music files (optional)
    ├── background-music.mp3
    └── happy-birthday.mp3
```

## 🚀 Quy trình thêm media

### 1. Rename event folders (nếu cần)
Đổi ngày placeholder thành ngày thực:
- `2024-01-01_before-confession` → `2024-MM-DD_before-confession`
- `2024-02-01_confession-day` → `2024-MM-DD_confession-day`
- v.v.

**CHÚ Ý**: `2024-09-30_boyfriend-birthday` đã đúng ngày, không cần đổi!

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
