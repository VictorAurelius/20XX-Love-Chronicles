# Event: Trước Khi Tỏ Tình

## 📝 Hướng dẫn

### 1. Đổi tên folder (nếu cần)
Rename folder thành ngày chính xác:
```
2024-01-01_before-confession  →  2024-MM-DD_before-confession
```
Format: `YYYY-MM-DD_event-slug` (ví dụ: `2024-01-15_before-confession`)

### 2. Thêm files vào folder này:

#### Bắt buộc:
- ✅ **cover.jpg** - Ảnh đại diện cho event (1200x800px recommended)

#### Optional:
- **01.jpg, 02.jpg, 03.jpg...** - Ảnh theo thứ tự (~10 ảnh ước tính, có thể nhiều hơn/ít hơn)
- **video-01.mp4, video-02.mp4** - Videos vertical 9:16 (1080x1920, ~15-25MB mỗi video)
- **note.txt** - Ghi chú, lời nhắn về event này

### 3. Naming rules:
- Ảnh: `cover.jpg`, `01.jpg`, `02.jpg`, `03.jpg`, ...
- Video: `video-01.mp4`, `video-02.mp4`, ...
- Không có dấu tiếng Việt, không có spaces
- Số thứ tự: 2 chữ số (01, 02, ... 10, 11, ...)

### 4. Optimization tips:
- **Ảnh**: Compress với TinyPNG/Squoosh (target 1-2MB/ảnh)
- **Video**: Compress với HandBrake (target 15-25MB/video)
  - Format: MP4 (H.264)
  - Resolution: 1080x1920 (vertical)
  - Bitrate: 3-4 Mbps

### 5. Example structure:
```
2024-01-01_before-confession/
├── README.md (file này, có thể xóa sau khi hiểu)
├── cover.jpg          ← BẮT BUỘC
├── 01.jpg
├── 02.jpg
├── 03.jpg
├── ...
├── 10.jpg
├── video-01.mp4       ← Optional
├── video-02.mp4       ← Optional
└── note.txt           ← Optional
```

---

**Sau khi thêm xong files, DELETE file README.md này!**
