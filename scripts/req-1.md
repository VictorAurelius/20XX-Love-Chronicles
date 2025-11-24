# Plan Task: Web Couple Timeline - 20XX Love Chronicles

## Tổng Quan
Xây dựng website tĩnh couple timeline với Next.js (Static Export), hiển thị hành trình tình yêu qua ảnh/video theo mốc thời gian, tích hợp events đặc biệt và tính năng tương tác.

**Theme**: Romantic với animations mượt mà
**Deployment**: GitHub Pages + Docker support
**Content**: 5 events chính với ~47 ảnh
**Update workflow**: Manual copy files → Auto-generate events → Rebuild

---

## 1. CẤU TRÚC THỨ MỤC VÀ ĐẶT TÊN FILE

### 1.1. Cấu trúc thư mục dự án
```
20XX-Love-Chronicles/
├── public/
│   └── data/                    # Thư mục chứa tất cả media files
│       ├── timeline/            # Media cho các mốc thời gian
│       │   ├── YYYY-MM-DD_event-name/
│       │   │   ├── cover.jpg    # Ảnh đại diện cho event
│       │   │   ├── 01.jpg       # Ảnh thứ 1
│       │   │   ├── 02.jpg       # Ảnh thứ 2
│       │   │   ├── video-01.mp4 # Video (nếu có)
│       │   │   └── note.txt     # Ghi chú văn bản (nếu có)
│       │   ├── 2024-01-14_first-meet/
│       │   ├── 2024-02-14_first-date/
│       │   ├── 2024-03-14_one-month/
│       │   └── 2024-06-22_trip-dalat/
│       ├── events/              # Media cho sự kiện đặc biệt
│       │   ├── birthday/
│       │   │   ├── 2024/
│       │   │   └── 2025/
│       │   ├── anniversary/
│       │   └── special-days/
│       ├── avatars/             # Avatar của couple
│       │   ├── avatar-boy.jpg
│       │   └── avatar-girl.jpg
│       └── backgrounds/         # Background images/videos
│           ├── hero-bg.jpg
│           └── particle-bg.mp4
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── data/                    # JSON configs
│       ├── timeline-data.json   # Dữ liệu timeline
│       ├── events-data.json     # Dữ liệu events
│       └── couple-info.json     # Thông tin couple
└── scripts/
```

### 1.2. Quy tắc đặt tên file

#### Thư mục timeline events:
- **Format**: `YYYY-MM-DD_event-slug/`
- **Ví dụ cho 5 events hiện tại**:
  - `2024-XX-XX_before-confession/` (~10 ảnh)
  - `2024-XX-XX_confession-day/` (~5 ảnh)
  - `2024-XX-XX_memories-before-birthday/` (~20 ảnh)
  - `2024-09-30_boyfriend-birthday/` (~7 ảnh)
  - `2024-XX-XX_girlfriend-birthday/` (~5 ảnh) **⭐ Trang chính - Special highlight**

#### File ảnh/video trong mỗi event:
- **cover.jpg**: Ảnh đại diện (bắt buộc, 1200x800px recommended)
- **01.jpg, 02.jpg, 03.jpg...**: Ảnh sắp xếp theo thứ tự
- **video-01.mp4, video-02.mp4**: Video (tối đa 50MB/file)
- **note.txt**: Ghi chú văn bản, lời nhắn

#### File config JSON:
- **timeline-data.json**: Metadata cho timeline
- **events-data.json**: Cấu hình events đặc biệt
- **couple-info.json**: Thông tin couple (tên, ngày bắt đầu, avatar)

---

## 2. SETUP CƠ BẢN & CẤU TRÚC DỰ ÁN

### Task 2.1: Initialize Next.js project
- [ ] Tạo project Next.js 14+ với App Router
- [ ] Configure static export trong `next.config.js`
- [ ] Setup TypeScript, ESLint, Prettier
- [ ] Cài đặt dependencies:
  - `framer-motion`: Animation
  - `swiper`: Slider ảnh/video
  - `react-intersection-observer`: Lazy loading
  - `date-fns`: Xử lý ngày tháng
  - `react-player`: Video player
  - `sharp`: Optimize images

### Task 2.2: Setup base layout & styling - ROMANTIC THEME
- [ ] Tạo global styles với CSS Variables cho romantic theme:
  - Primary colors: Soft pink (#FFB6C1), Rose gold (#B76E79), Peach (#FFDAB9)
  - Secondary: Lavender (#E6E6FA), Cream (#FFF8DC)
  - Accent: Deep rose (#C85A82), Gold (#FFD700)
  - Neutral: Warm white (#FAFAF5), Soft gray (#F5F5F5)
- [ ] Setup responsive breakpoints (mobile-first)
- [ ] Tạo base components: Container, Grid, Typography
- [ ] Configure romantic fonts:
  - Heading: "Playfair Display" hoặc "Cormorant Garamond" (serif, elegant)
  - Body: "Montserrat" hoặc "Poppins" (sans-serif, clean)
  - Accent: "Great Vibes" hoặc "Parisienne" (script/handwritten)

### Task 2.3: Tạo data structure & JSON schemas + AUTO-GENERATE SCRIPT
- [ ] **QUAN TRỌNG**: Tạo script `scripts/generate-timeline.js` để tự động scan `public/data/timeline/` và generate `src/data/timeline-data.json`
  - Scan tất cả folders có format `YYYY-MM-DD_event-name/`
  - Count số ảnh/video trong mỗi folder
  - Extract metadata từ tên folder và `note.txt`
  - Generate JSON với đầy đủ thông tin
  - Chạy script này trước mỗi lần build
- [ ] Tạo `src/data/timeline-data.json` với schema:
```json
{
  "timeline": [
    {
      "id": "first-meet",
      "date": "2024-01-14",
      "title": "Lần Đầu Gặp Gỡ",
      "description": "Ngày đầu tiên chúng mình gặp nhau...",
      "location": "Quán cafe ABC",
      "folder": "2024-01-14_first-meet",
      "mediaCount": {
        "images": 5,
        "videos": 1
      },
      "tags": ["first", "special", "memorable"]
    }
  ]
}
```

- [ ] Tạo `src/data/events-data.json`:
```json
{
  "events": [
    {
      "id": "birthday-girl",
      "type": "birthday",
      "name": "Sinh Nhật Baby",
      "date": "MM-DD",
      "recurring": true,
      "isPrimaryEvent": true,
      "showOnHomepage": true,
      "effects": ["rose-petals", "hearts-float", "fireworks", "confetti"],
      "music": "happy-birthday.mp4",
      "message": "Chúc mừng sinh nhật em yêu của anh! 💕",
      "specialLayout": "hero-spotlight"
    },
    {
      "id": "birthday-boy",
      "type": "birthday",
      "name": "Sinh Nhật Anh",
      "date": "09-30",
      "recurring": true,
      "effects": ["confetti"],
      "message": "Chúc mừng sinh nhật anh! 🎂"
    }
  ]
}
```

- [ ] Tạo `src/data/couple-info.json`:
```json
{
  "couple": {
    "boy": {
      "name": "Tên anh",
      "avatar": "/data/avatars/avatar-boy.jpg",
      "nickname": "Anh yêu"
    },
    "girl": {
      "name": "Tên em",
      "avatar": "/data/avatars/avatar-girl.jpg",
      "nickname": "Em yêu"
    },
    "startDate": "2024-01-14",
    "motto": "Yêu nhau mỗi ngày!"
  }
}
```

---

## 3. XÂY DỰNG COMPONENTS CƠ BẢN

### Task 3.1: Header & Navigation
- [ ] Component Header với logo/title couple
- [ ] Navigation menu: Home, Timeline, Gallery, Events, About
- [ ] Love counter (số ngày yêu) tự động cập nhật
- [ ] Dark/Light mode toggle
- [ ] Mobile hamburger menu

### Task 3.2: Hero Section (Homepage) - ROMANTIC & SMOOTH
- [ ] Hero banner với ảnh couple (gradient overlay: rose gold → transparent)
- [ ] Animated text với Framer Motion:
  - Tên couple fade in từ trên xuống (stagger animation)
  - Slogan/motto typewriter effect hoặc fade in
  - Smooth transitions, không jerky
- [ ] Floating elements với smooth animations:
  - Rose petals rơi chậm (CSS keyframes + random delays)
  - Hearts float up từ bottom (subtle, không overwhelming)
  - Particles sparkle effect (optional, subtle)
- [ ] Scroll down indicator:
  - Bouncing arrow animation
  - Smooth scroll behavior khi click
- [ ] **Special**: Nếu là ngày sinh nhật bạn gái, replace hero với special birthday layout

### Task 3.3: Timeline Component
- [ ] Timeline layout dọc responsive (vertical on mobile, có thể horizontal on desktop)
- [ ] TimelineCard component cho mỗi event:
  - Cover image
  - Date & title
  - Short description
  - "Xem chi tiết" button
- [ ] Smooth scroll animation khi scroll qua cards
- [ ] Parallax effect cho background

### Task 3.4: Story Card Detail (Modal/Page)
- [ ] Modal hoặc dedicated page cho mỗi event
- [ ] Image gallery với Swiper slider
- [ ] Video player embed
- [ ] Text note display
- [ ] Navigation: Previous/Next event
- [ ] Share button (optional)

### Task 3.5: Event Countdown & Effects
- [ ] Countdown component hiển thị đếm ngược đến event
- [ ] Trigger effects khi đến ngày event:
  - Fireworks canvas animation
  - Confetti particles
  - Auto-play music
  - Popup modal với lời chúc
- [ ] Event banner ở homepage khi gần đến ngày event

---

## 4. MEDIA HANDLING & OPTIMIZATION

### Task 4.1: Image optimization
- [ ] Setup Next.js Image component với blur placeholder
- [ ] Tự động resize/optimize ảnh từ `public/data/`
- [ ] Lazy loading cho tất cả ảnh ngoài viewport
- [ ] Responsive images với srcset

### Task 4.2: Video handling
- [ ] Video player component với controls
- [ ] Poster image từ cover.jpg
- [ ] Lazy load video khi scroll đến
- [ ] Fallback cho video không load được

### Task 4.3: File loader utility
- [ ] Function để scan folder timeline và load media:
```typescript
// src/lib/media-loader.ts
export function getEventMedia(eventFolder: string) {
  // Scan /data/timeline/{eventFolder}/
  // Return { cover, images: [], videos: [] }
}
```
- [ ] Generate static paths cho tất cả events lúc build time

---

## 5. FEATURES NÂNG CAO

### Task 5.1: Gallery page
- [ ] Masonry grid layout cho tất cả ảnh
- [ ] Filter by: year, tag, event type
- [ ] Lightbox xem ảnh full size
- [ ] Infinite scroll hoặc pagination

### Task 5.2: Music player
- [ ] Background music player (có thể tắt/bật)
- [ ] Playlist cho từng event khác nhau
- [ ] Auto-play music theo event đặc biệt

### Task 5.3: Secret notes (optional)
- [ ] Hidden notes unlock bằng password
- [ ] "Mật mã tình yêu" Easter egg
- [ ] Popup surprise khi click vào icons ẩn

### Task 5.4: Easter Eggs & Hidden Features
- [ ] Secret couple messages ẩn (click vào specific elements)
- [ ] Konami code hoặc secret gesture để unlock special content
- [ ] Hidden photo album (password protected section)

---

## 6. ANIMATIONS & INTERACTIONS - SMOOTH & ROMANTIC

**Nguyên tắc**: Tất cả animations phải mượt mà (60fps), không giật lag, timing tự nhiên

### Task 6.1: Scroll animations (Framer Motion + Intersection Observer)
- [ ] Fade in/slide up khi scroll đến elements:
  - Timeline cards: Slide from left/right alternating, với delay stagger
  - Gallery images: Fade + scale from 0.95 to 1
  - Duration: 0.6-0.8s với easing `ease-out` hoặc `cubic-bezier(0.4, 0, 0.2, 1)`
- [ ] Progress bar theo scroll depth (sticky top, romantic gradient)
- [ ] Parallax layers cho backgrounds (slower speed, subtle effect)
- [ ] Heart/rose petals reveal khi scroll (intersection trigger)

### Task 6.2: Hover effects (smooth transitions)
- [ ] Card hover (duration 0.3s):
  - Scale: 1.02-1.05 (subtle, không quá to)
  - Shadow: Soft romantic glow (rose gold color với blur)
  - Optional: Tilt effect 3D (rotate 2-3 degrees)
  - Cover image: Slight zoom in (1.1x)
- [ ] Button hover:
  - Background gradient shift
  - Bounce animation nhẹ
  - Icon animations (arrow move, heart beat)
- [ ] Image hover overlay:
  - Fade in info/caption từ bottom
  - Romantic gradient overlay

### Task 6.3: Page transitions (Framer Motion AnimatePresence)
- [ ] Smooth transitions giữa pages/modals (fade + slide):
  - Enter: Fade in + slide up from bottom
  - Exit: Fade out + slide down slightly
  - Duration: 0.4-0.5s
- [ ] Loading animation:
  - Romantic spinner (heart pulse hoặc rose rotate)
  - Skeleton screens với shimmer effect
- [ ] Modal animations:
  - Backdrop fade in 0.2s
  - Content scale from 0.95 to 1 + fade in
  - Exit: Scale to 0.95 + fade out

### Task 6.4: Micro-interactions (delight details)
- [ ] Heart beat animation khi like/favorite
- [ ] Confetti burst khi complete milestone
- [ ] Ripple effect khi click buttons
- [ ] Smooth number counter animation (love days counter)
- [ ] Toast notifications với slide in/out

---

## 7. RESPONSIVE & CROSS-BROWSER

### Task 7.1: Mobile optimization
- [ ] Touch gestures cho swiper
- [ ] Mobile-first timeline layout
- [ ] Optimize images cho mobile (WebP, smaller sizes)
- [ ] Test trên iOS Safari & Android Chrome

### Task 7.2: Desktop enhancements
- [ ] Wider timeline layout on desktop
- [ ] Keyboard navigation
- [ ] Hover states
- [ ] Multi-column gallery

### Task 7.3: Performance
- [ ] Lighthouse score 90+
- [ ] Core Web Vitals optimization
- [ ] Preload critical assets
- [ ] Code splitting

---

## 8. DEPLOYMENT & MAINTENANCE

### Task 8.1: Build & export cho GitHub Pages
- [ ] Config `next.config.js` cho static export:
  ```js
  module.exports = {
    output: 'export',
    basePath: process.env.NODE_ENV === 'production' ? '/20XX-Love-Chronicles' : '',
    images: {
      unoptimized: true, // Required for static export
    },
  }
  ```
- [ ] Update `package.json` scripts:
  ```json
  {
    "scripts": {
      "preexport": "node scripts/generate-timeline.js",
      "export": "next build",
      "deploy": "npm run export && gh-pages -d out"
    }
  }
  ```
- [ ] Test exported `out/` folder locally

### Task 8.2: GitHub Pages deployment
- [ ] Setup GitHub Actions workflow (`.github/workflows/deploy.yml`):
  - Trigger on push to main branch
  - Run `npm run preexport` (auto-generate timeline data)
  - Build Next.js static site
  - Deploy to `gh-pages` branch
- [ ] Configure GitHub Pages settings:
  - Source: `gh-pages` branch
  - Custom domain (optional)
  - HTTPS enforced
- [ ] Add `CNAME` file nếu dùng custom domain

### Task 8.3: Docker support
- [ ] Tạo `Dockerfile` cho development:
  ```dockerfile
  FROM node:18-alpine
  WORKDIR /app
  COPY package*.json ./
  RUN npm install
  COPY . .
  EXPOSE 3000
  CMD ["npm", "run", "dev"]
  ```
- [ ] Tạo `docker-compose.yml`:
  ```yaml
  version: '3.8'
  services:
    web:
      build: .
      ports:
        - "3000:3000"
      volumes:
        - .:/app
        - /app/node_modules
  ```
- [ ] Dockerfile cho production build preview

### Task 8.4: Update workflow (Manual copy + Auto-generate)
**Quy trình cập nhật nội dung:**
1. **Copy ảnh mới vào**: `public/data/timeline/YYYY-MM-DD_event-name/`
   - Đặt tên file theo convention: `cover.jpg`, `01.jpg`, `02.jpg`...
   - (Optional) Thêm `note.txt` với nội dung mô tả
2. **Run auto-generate script**: `npm run preexport`
   - Script tự động scan folders và generate `timeline-data.json`
   - Không cần edit JSON manually!
3. **Test locally**: `npm run dev` để xem preview
4. **Deploy**:
   - Push to GitHub → Auto-deploy via GitHub Actions
   - Hoặc run manual: `npm run deploy`

**Script `generate-timeline.js` features:**
- [ ] Scan tất cả folders trong `public/data/timeline/`
- [ ] Extract date từ folder name (YYYY-MM-DD)
- [ ] Extract event slug từ folder name
- [ ] Count images (*.jpg, *.png, *.webp)
- [ ] Count videos (*.mp4, *.webm)
- [ ] Read `note.txt` nếu có (làm description)
- [ ] Generate JSON với metadata đầy đủ
- [ ] Sort events theo date (oldest first)
- [ ] Validate data trước khi write file

---

## 9. TESTING & QA

### Task 9.1: Functional testing
- [ ] Test tất cả navigation links
- [ ] Test modal/popup behaviors
- [ ] Test countdown logic
- [ ] Test event trigger vào đúng ngày

### Task 9.2: Content testing
- [ ] Check tất cả ảnh/video load đúng
- [ ] Check text không bị overflow
- [ ] Check date formatting
- [ ] Check tính toán số ngày yêu chính xác

### Task 9.3: UX testing
- [ ] Feedback từ couple
- [ ] Feedback từ bạn bè
- [ ] A/B test animations (quá nhiều hay vừa đủ?)

---

## 10. NICE-TO-HAVE FEATURES (Phase 2)

### Task 10.1: Interactive roadmap
- [ ] "Kế hoạch tương lai" section với interactive map
- [ ] Bucket list couple với checkboxes
- [ ] Dreams timeline (future plans visualization)

### Task 10.2: Enhanced interactions
- [ ] AR photo viewer (xem ảnh trong không gian 3D)
- [ ] Photo comparison slider (before/after, then/now)
- [ ] Interactive love story game/quiz

### Task 10.3: Social & sharing
- [ ] Beautiful OG images cho social sharing
- [ ] "Share this moment" buttons
- [ ] Download event as PDF/slideshow

### Task 10.4: Analytics (privacy-friendly)
- [ ] Simple analytics với Plausible hoặc Umami
- [ ] Track popular events/photos
- [ ] Love meter stats (funny visualizations)

---

## PHỤ LỤC: CHECKLIST THỨ TỰ THỰC HIỆN

### Phase 1: Foundation & Setup (Week 1)
**Priority: HIGH - Must complete first**
- [ ] Task 2.1: Initialize Next.js project với dependencies
- [ ] Task 2.2: Setup romantic theme (colors, fonts, base styles)
- [ ] Task 2.3: Tạo auto-generate script `generate-timeline.js` ⭐ CRITICAL
- [ ] Task 8.3: Setup Docker cho development
- [ ] Chuẩn bị 5 events với ~47 ảnh vào `public/data/timeline/`
- [ ] Test auto-generate script và data structure

### Phase 2: Core UI & Timeline (Week 2)
**Priority: HIGH - Core features**
- [ ] Task 3.1: Header với love counter
- [ ] Task 3.2: Hero section với romantic animations
- [ ] Task 3.3: Timeline component với smooth scroll
- [ ] Task 3.4: Story card detail (modal/page)
- [ ] Task 4.1, 4.2, 4.3: Media handling & optimization
- [ ] Test timeline với real data

### Phase 3: Special Features & Animations (Week 3)
**Priority: MEDIUM - Enhanced experience**
- [ ] Task 3.5: Birthday countdown & effects (girlfriend birthday special!)
- [ ] Task 5.1: Gallery page với masonry layout
- [ ] Task 5.2: Music player (background + event-specific)
- [ ] Task 6.1, 6.2, 6.3, 6.4: Tất cả animations (smooth & romantic!)
- [ ] Task 5.3, 5.4: Easter eggs & hidden features

### Phase 4: Polish, Deploy & Testing (Week 4)
**Priority: HIGH - Launch ready**
- [ ] Task 7.1, 7.2: Responsive optimization (mobile + desktop)
- [ ] Task 7.3: Performance optimization (Lighthouse 90+)
- [ ] Task 9.1, 9.2, 9.3: Testing đầy đủ
- [ ] Task 8.1: Build & export config
- [ ] Task 8.2: GitHub Actions + GitHub Pages deployment
- [ ] Task 8.4: Document update workflow
- [ ] Final testing trên production URL

---

## GHI CHÚ QUAN TRỌNG

### 1. Media Files & Optimization
- **Ảnh**: Optimize trước khi upload (max 2MB/ảnh, recommend 800-1200px width)
  - Format: JPG cho photos, PNG cho graphics, WebP cho modern browsers
  - Tools: TinyPNG, Squoosh, ImageOptim
- **Video**: Compress heavily (max 50MB/file) hoặc embed YouTube/Vimeo
  - GitHub Pages có limit 100MB/file, total repo < 1GB
- **Tổng dung lượng**: ~47 ảnh × 1-2MB = ~50-100MB (OK cho GitHub Pages)

### 2. Naming Convention - STRICT RULES
- **Folder names**: `YYYY-MM-DD_event-slug/`
  - ✅ `2024-09-30_boyfriend-birthday/`
  - ❌ `2024-9-30_Sinh nhật/` (no Vietnamese, no single digit month/day)
- **File names**: `cover.jpg`, `01.jpg`, `02.jpg`, `video-01.mp4`
  - Không có dấu tiếng Việt, không có spaces
  - Dùng kebab-case: `event-name`, not `Event Name`
- **Date format**: ISO 8601 `YYYY-MM-DD` (2024-09-30, not 30/9/2024)

### 3. Privacy & Security
- **Public site**: Mọi người đều có thể xem (theo yêu cầu)
- **Cẩn thận với ảnh nhạy cảm**: Đừng commit ảnh quá riêng tư
- **Optional**: Có thể add Cloudflare Access hoặc basic auth sau

### 4. Performance Targets
- **Lighthouse scores**: Performance 90+, Best Practices 95+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Total page size**: < 3MB (first load), < 500KB (subsequent)
- **Images**: Lazy load tất cả ngoài viewport
- **Fonts**: Preload critical fonts, subset chỉ characters cần dùng

### 5. Git & GitHub Best Practices
- **Gitignore**: Add `public/data/` nếu không muốn commit ảnh cá nhân
  - Hoặc dùng Git LFS cho large files
- **Commit messages**: Descriptive (e.g., "Add confession day photos", "Update timeline with birthday event")
- **Branches**: Main branch cho production, develop cho testing
- **GitHub Actions**: Auto-deploy on push to main (đã config ở Task 8.2)

---

## ✅ CONFIRMED REQUIREMENTS (Đã xác nhận)

### Content & Data
1. **Events**: 5 events chính
   - Trước khi tỏ tình: ~10 ảnh
   - Hôm tỏ tình: ~5 ảnh
   - Kỉ niệm khác (trước 30/09): ~20 ảnh
   - Sinh nhật bạn trai (30/09): ~7 ảnh
   - **Sinh nhật bạn gái** (trang chính): ~5 ảnh ⭐ SPECIAL EVENT
2. **Tổng ảnh**: ~47 ảnh (storage ~50-100MB, OK cho GitHub Pages)

### Deployment & Infrastructure
3. **Hosting**: GitHub Pages (free, reliable)
4. **Docker**: Support for local development
5. **Update workflow**: Manual copy files → Auto-generate events → Rebuild & redeploy

### Features & UX
6. **Access**: Public site, mọi người có thể xem
7. **Auto-generate**: Events tự động generate từ folder structure (không cần edit JSON manual)
8. **Design**: Claude tự thiết kế
9. **Theme**: **Romantic** với animations **mượt mà, smooth** (60fps)
10. **Color scheme**: Romantic colors (soft pink, rose gold, lavender, cream)

---

## 🎯 SUCCESS CRITERIA

Dự án được coi là thành công khi:

✅ **Technical**:
- [ ] Website build & deploy thành công lên GitHub Pages
- [ ] Docker container chạy được locally
- [ ] Auto-generate script hoạt động perfect (scan folders → generate JSON)
- [ ] Lighthouse Performance score ≥ 90
- [ ] Responsive trên mobile + desktop
- [ ] Tất cả 5 events hiển thị đúng với đầy đủ ảnh

✅ **Design & UX**:
- [ ] Romantic theme đẹp, cohesive
- [ ] Animations mượt mà (60fps), không giật lag
- [ ] Timeline dễ navigate, intuitive
- [ ] Sinh nhật bạn gái có special treatment (effects, layout)
- [ ] Love counter cập nhật real-time

✅ **Maintainability**:
- [ ] Dễ dàng add events mới (copy files → rebuild)
- [ ] Code clean, well-documented
- [ ] README rõ ràng với hướng dẫn update
- [ ] GitHub Actions auto-deploy hoạt động

---

## 📅 TIMELINE ESTIMATE

- **Week 1**: Foundation & setup (Next.js, theme, auto-generate script, Docker)
- **Week 2**: Core UI (timeline, story cards, media handling)
- **Week 3**: Special features (animations, birthday effects, gallery, music)
- **Week 4**: Polish & deploy (responsive, performance, testing, GitHub Pages)

**Total**: ~4 weeks cho full MVP với all features

**MVP v0.5** (có thể deploy sớm): 2 weeks (chỉ timeline + basic animations)

---

**Version**: 2.0 (Updated with confirmed requirements)
**Created**: 2025-11-24
**Updated**: 2025-11-24
**Status**: ✅ Ready to start development
