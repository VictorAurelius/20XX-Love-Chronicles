# 💕 20XX Love Chronicles

Website timeline couple lãng mạn được xây dựng bằng Next.js 14, với animations mượt mà, photo galleries và video memories.

![Love Chronicles Banner](https://img.shields.io/badge/Love-Chronicles-FF69B4?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## ✨ Tính Năng

### Tính Năng Chính
- 🎨 **Giao Diện Lãng Mạn** - Bảng màu hồng pastel, vàng hồng, tím lavender
- 💕 **Love Counter** - Tự động tính số ngày yêu nhau
- 📅 **Timeline** - Timeline dọc đẹp mắt với 6 sự kiện
- 📸 **Photo Galleries** - Swiper carousel với lightbox
- 🎥 **Vertical Videos** - Video player tối ưu cho format 9:16 (TikTok/Instagram style)
- ✨ **Animations Mượt** - Framer Motion animations khắp nơi
- 🌹 **Hiệu Ứng Trang Trí** - Trái tim bay, cánh hoa hồng rơi
- 📱 **Responsive Hoàn Toàn** - Thiết kế mobile-first

### Tính Năng Đặc Biệt
- **Event Kỷ Niệm Đời Thường** - Xử lý đặc biệt với:
  - Masonry grid layout (Pinterest style)
  - Lazy loading để tối ưu hiệu năng
  - Hỗ trợ 20+ ảnh
- **Auto-Generate Timeline** - Tự động scan folder và tạo JSON
- **Static Export** - Sẵn sàng cho GitHub Pages
- **Docker Support** - Phát triển local dễ dàng

---

## 🚀 Bắt Đầu Nhanh

### Yêu Cầu
- Node.js 18+
- npm hoặc yarn

### Cài Đặt

```bash
# Clone repository
git clone https://github.com/yourusername/20XX-Love-Chronicles.git
cd 20XX-Love-Chronicles

# Cài đặt dependencies
npm install

# Generate timeline data từ folders
npm run preexport

# Chạy development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem website.

---

## 📂 Cấu Trúc Dự Án

```
20XX-Love-Chronicles/
├── public/
│   └── data/
│       ├── timeline/               # Thư mục chứa photos/videos của events
│       │   ├── 2024-11-21_before-confession/
│       │   ├── 2025-01-20_confession-day/
│       │   ├── 2025-03-01_daily-memories/     # Event đặc biệt
│       │   ├── 2025-09-30_boyfriend-birthday/
│       │   ├── 2025-11-01_trip-ninh-binh/
│       │   └── 2025-12-10_girlfriend-birthday/
│       ├── music/                  # Nhạc nền
│       │   └── birthday/           # Thư mục nhạc sinh nhật
│       ├── avatars/                # Avatar của couple
│       └── backgrounds/            # Ảnh nền
├── src/
│   ├── app/
│   │   ├── event/[id]/page.tsx    # Trang event động
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Trang chủ
│   │   └── globals.css            # Global styles
│   ├── components/
│   │   ├── Header.tsx             # Navigation với love counter
│   │   ├── Hero.tsx               # Hero section với animations
│   │   ├── Timeline.tsx           # Timeline component
│   │   └── EventDetail.tsx        # Trang chi tiết event
│   ├── lib/
│   │   └── date-utils.ts          # Utility functions cho date
│   └── data/
│       ├── timeline-data.json     # Tự động generate từ folders
│       ├── events-data.json       # Cấu hình events đặc biệt
│       └── couple-info.json       # Thông tin couple
└── scripts/
    └── generate-timeline.js       # Script auto-generate
```

---

## 📝 Thêm Nội Dung

### 1. Tạo Thư Mục Event

Tạo folder mới trong `public/data/timeline/` với format:

```
YYYY-MM-DD_ten-event/
```

Ví dụ: `2025-03-14_bua-toi-lang-man/`

### 2. Thêm File Media

Bên trong thư mục event:

```
2025-03-14_bua-toi-lang-man/
├── cover.jpg           # Bắt buộc: Ảnh đại diện (1200x800px)
├── 01.jpg              # Ảnh 1
├── 02.jpg              # Ảnh 2
├── ...
├── video-01.mp4        # Video dọc (format 9:16)
├── video-02.mp4        # Video dọc
└── note.txt            # Tùy chọn: Mô tả event
```

**Quy tắc đặt tên file**:
- ✅ Cover: `cover.jpg` (bắt buộc)
- ✅ Ảnh: `01.jpg`, `02.jpg`, `03.jpg`...
- ✅ Video: `video-01.mp4`, `video-02.mp4`...
- ✅ Note: `note.txt` (mô tả tùy chọn)

### 3. Auto-Generate Timeline

```bash
npm run preexport
```

Lệnh này sẽ:
- Scan tất cả folders trong `public/data/timeline/`
- Đếm số ảnh và video
- Đọc `note.txt` để lấy mô tả
- Generate `src/data/timeline-data.json`
- Sắp xếp events theo ngày

### 4. Test Local

```bash
npm run dev
# Mở http://localhost:3000
```

---

## 🎨 Tùy Chỉnh

### Cập Nhật Thông Tin Couple

Sửa `src/data/couple-info.json`:

```json
{
  "couple": {
    "boy": {
      "name": "Tên Bạn",
      "birthday": "1998-09-30"
    },
    "girl": {
      "name": "Tên Bạn Gái",
      "birthday": "1999-12-10"
    },
    "relationship": {
      "startDate": "2025-01-20",
      "motto": "Câu nói yêu thương của bạn! 💕"
    }
  }
}
```

### Tùy Chỉnh Màu Sắc

Sửa `tailwind.config.ts`:

```typescript
colors: {
  romantic: {
    pink: '#FFB6C1',      // Đổi sang màu bạn thích
    rose: '#B76E79',
    lavender: '#E6E6FA',
    // ...
  }
}
```

### Tùy Chỉnh Font

Sửa `src/app/layout.tsx`:

```typescript
import { FontCuaBan } from "next/font/google";

const fontCuaBan = FontCuaBan({
  subsets: ["latin"],
  variable: "--font-heading",
});
```

---

## 🎥 Hướng Dẫn Media

### Ảnh
- **Format**: JPG, PNG, hoặc WebP
- **Size**: < 2MB mỗi ảnh (khuyến nghị: 200-500KB)
- **Resolution**: 1920x1080 hoặc nhỏ hơn
- **Tools**: [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)

### Video
- **Format**: MP4 (H.264 codec)
- **Aspect Ratio**: 9:16 (dọc, như TikTok/Instagram)
- **Resolution**: 1080x1920
- **Size**: < 10MB mỗi video (mục tiêu)
- **Duration**: 10-60 giây khuyến nghị
- **Nén video**:
  ```bash
  ffmpeg -i input.mp4 -vf "scale=1080:1920" -c:v libx264 -crf 23 -b:a 128k output.mp4
  ```

---

## 🐳 Sử Dụng Docker

### Development

```bash
# Chạy container
docker-compose up

# Dừng container
docker-compose down
```

Website sẽ chạy tại `http://localhost:3000`

### Tính Năng
- Hot reload được bật
- Volume mounts cho code changes
- Node 18 Alpine base image

---

## 🚢 Deployment

### Build cho Production

```bash
# Generate timeline data + build
npm run export

# Output trong folder /out
```

### Deploy lên GitHub Pages

```bash
npm run deploy
```

Lệnh này sẽ:
1. Chạy `preexport` (generate timeline data)
2. Build static site
3. Deploy lên `gh-pages` branch

### GitHub Actions (Auto-Deploy)

Tạo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Generate timeline data
        run: npm run preexport

      - name: Build
        run: npm run export

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

---

## 🎵 Music Player (Sắp Có)

Tính năng music player được lên kế hoạch với:
- Tự động detect MP3 files trong `public/data/music/`
- Chế độ shuffle/random
- Chế độ birthday playlist (folder đặc biệt `music/birthday/`)
- Điều chỉnh âm lượng
- Mini player UI (sticky)

---

## 📊 Tiến Độ Hiện Tại

**Phase 1: Foundation** → ✅ 100% Hoàn Thành
**Phase 2: Core UI** → ✅ 100% Hoàn Thành
**Phase 3: Features** → 🔄 Đang Thực Hiện
**Phase 4: Polish & Deploy** → ⏳ Chờ

**Tổng Thể**: ~65% Hoàn Thành

### Đã Hoàn Thành
- ✅ Next.js setup với TypeScript
- ✅ Giao diện lãng mạn với Tailwind CSS
- ✅ Script auto-generate timeline
- ✅ Header với love counter
- ✅ Hero section với animations
- ✅ Timeline component
- ✅ Trang chi tiết event
- ✅ Photo galleries (Swiper)
- ✅ Vertical video player
- ✅ Xử lý đặc biệt Daily Memories
- ✅ Responsive design
- ✅ Animations mượt (Framer Motion)

### Chưa Hoàn Thành
- ⏳ Music player với chế độ birthday
- ⏳ Countdown sinh nhật & hiệu ứng
- ⏳ Trang gallery với filters
- ⏳ Tối ưu hiệu năng
- ⏳ GitHub Actions deployment
- ⏳ Testing cuối cùng

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Ngôn Ngữ**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Carousel**: [Swiper.js](https://swiperjs.com/)
- **Date Utilities**: [date-fns](https://date-fns.org/)
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Playfair Display, Poppins, Great Vibes)
- **Deployment**: [GitHub Pages](https://pages.github.com/)

---

## 📖 Scripts

```bash
npm run dev          # Chạy dev server
npm run build        # Build cho production
npm run start        # Chạy production server
npm run lint         # Chạy ESLint
npm run preexport    # Generate timeline data
npm run export       # Build static site
npm run deploy       # Deploy lên GitHub Pages
```

---

## 🤝 Đóng Góp

Đây là project timeline couple cá nhân. Bạn có thể fork và tùy chỉnh cho câu chuyện tình yêu của riêng bạn!

---

## 📄 License

MIT License - Thoải mái sử dụng cho các project lãng mạn của bạn! 💕

---

## 🙏 Lời Cảm Ơn

- Lấy cảm hứng từ các thiết kế timeline couple lãng mạn
- Được xây dựng với tình yêu sử dụng công nghệ web hiện đại
- Cảm ơn đặc biệt tới tất cả các thư viện open-source được sử dụng

---

## 📬 Liên Hệ

Nếu có câu hỏi hoặc feedback về cấu trúc project, thoải mái mở issue!

---

**Được tạo với 💕 bởi Claude Code**

*Tôn vinh tình yêu, từng dòng code một.*
