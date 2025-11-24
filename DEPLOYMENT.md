# Hướng Dẫn Deploy Lên GitHub Pages

## Các Vấn Đề Đã Được Sửa

### 1. **404 Errors cho Data Files**
**Vấn đề**: Khi deploy, các file như `cover.jpg`, `01-le-duong.mp3` bị lỗi 404.

**Nguyên nhân**: Đường dẫn không có `basePath` (`/20XX-Love-Chronicles`) trong production.

**Giải pháp**:
- Tạo utility function `getDataPath()` trong `src/lib/asset-utils.ts`
- Update tất cả components để sử dụng `getDataPath()`:
  - `Timeline.tsx` - cover images
  - `EventDetail.tsx` - event images/videos
  - `Gallery.tsx` - gallery images
  - `MusicPlayer.tsx` - music files

### 2. **404 Errors cho /timeline và /about**
**Vấn đề**: Header có links đến `/timeline` và `/about` nhưng các trang này không tồn tại.

**Giải pháp**:
- Xóa link `/about`
- Đổi `/timeline` thành `/#timeline` (scroll to timeline section)

### 3. **Asset Prefix Configuration**
**Vấn đề**: `basePath` được set nhưng `assetPrefix` chưa.

**Giải pháp**: Update `next.config.js`:
```js
const isProd = process.env.NODE_ENV === 'production';
const repoName = '/20XX-Love-Chronicles';

const nextConfig = {
  basePath: isProd ? repoName : '',
  assetPrefix: isProd ? repoName : '',  // ← THÊM DÒNG NÀY
  // ...
}
```

## Cách Deploy

### Bước 1: Push Code Lên GitHub

```bash
git add .
git commit -m "Fix deployment paths for GitHub Pages"
git push origin main
```

### Bước 2: Bật GitHub Pages

1. Vào repository settings trên GitHub
2. Chọn **Pages** ở sidebar bên trái
3. Trong **Source**, chọn **GitHub Actions**
4. GitHub Actions workflow sẽ tự động chạy

### Bước 3: Đợi Deploy Hoàn Thành

- Vào tab **Actions** để xem progress
- Khi deploy xong, website sẽ có tại: `https://[username].github.io/20XX-Love-Chronicles/`

## Kiểm Tra Sau Khi Deploy

Sau khi deploy xong, kiểm tra:

✅ **Home page** load đúng
✅ **Timeline** hiển thị cover images
✅ **Event details** hiển thị images và videos
✅ **Gallery** hiển thị tất cả ảnh
✅ **Music player** phát nhạc được

## Troubleshooting

### Lỗi: "Failed to load resource: 404"

**Nếu vẫn gặp 404 errors:**

1. **Kiểm tra basePath trong next.config.js**:
   - Phải match với repository name
   - Ví dụ: repo tên `my-love-story` → basePath = `/my-love-story`

2. **Rebuild lại**:
   ```bash
   rm -rf out .next
   npm run build
   ```

3. **Kiểm tra paths trong out/index.html**:
   ```bash
   grep 'href="/.*data' out/index.html
   ```

   Phải thấy: `/20XX-Love-Chronicles/data/...` (có basePath)

   KHÔNG phải: `/data/...` (thiếu basePath)

### Lỗi: Music không tự động phát

**Auto-play bị chặn**: Trình duyệt chặn auto-play. User phải click vào trang trước.

**Giải pháp**: Đã có sẵn trong code - music sẽ phát sau khi user tương tác lần đầu.

## GitHub Actions Workflow

Workflow tự động:
1. Checkout code
2. Setup Node.js 20
3. Install dependencies
4. Chạy `generate-timeline.js`
5. Build Next.js (production mode)
6. Deploy folder `out/` lên GitHub Pages

File: `.github/workflows/deploy.yml`

## Lưu Ý Quan Trọng

⚠️ **KHÔNG chỉnh sửa basePath** trong `next.config.js` nếu không đổi tên repository!

⚠️ **LUÔN test local** trước khi push:
```bash
NODE_ENV=production npm run build
# Mở out/index.html để kiểm tra
```

⚠️ **Data files phải ở trong /public/data/**:
```
public/
  data/
    music/
      01-le-duong.mp3
      02-tung-ngay-yeu-em.mp3
      birthday/
        ...
    timeline/
      2024-11-21_before-confession/
        cover.jpg
        01.jpg
        ...
```

## Cấu Trúc Project Sau Khi Sửa

```
src/
  lib/
    asset-utils.ts          ← MỚI: Utility cho asset paths
  components/
    Timeline.tsx            ← UPDATED: Dùng getDataPath()
    EventDetail.tsx         ← UPDATED: Dùng getDataPath()
    MusicPlayer.tsx         ← UPDATED: Dùng getDataPath()
    Header.tsx              ← UPDATED: Bỏ links không tồn tại
  app/
    gallery/
      page.tsx              ← UPDATED: Dùng getDataPath()
next.config.js              ← UPDATED: Thêm assetPrefix
.github/
  workflows/
    deploy.yml              ← GitHub Actions workflow
```

## Kiểm Tra Paths Đúng

### Development (npm run dev)
```
/data/timeline/2024-11-21_before-confession/cover.jpg
```

### Production (sau khi build)
```
/20XX-Love-Chronicles/data/timeline/2024-11-21_before-confession/cover.jpg
```

Utility `getDataPath()` tự động thêm basePath trong production mode!

---

**Chúc deploy thành công! 🎉**
