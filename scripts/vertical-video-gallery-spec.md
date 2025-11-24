# Vertical Video Gallery - Specification

Spec chi tiết cho video gallery/carousel, đặc biệt tối ưu cho vertical videos (9:16) và event có nhiều videos.

---

## 🎯 Context

**Challenge**:
- Tất cả videos đều vertical format (9:16) như TikTok/Instagram Reels
- Event "Daily Memories" có nhiều videos (2+, có thể lên đến 5-10 videos)
- Cần UX mượt mà, dễ xem, không lag

**Solution**:
- Vertical video carousel với swipe navigation
- Instagram/TikTok-style player
- Smooth transitions, lazy loading
- Mobile-first design

---

## 🎨 UI Design

### Desktop Layout (> 768px)

```
┌─────────────────────────────────────────────┐
│                                             │
│   ←                                    →    │  ← Prev/Next arrows
│                                             │
│         ┌─────────────────┐                │
│         │                 │                │
│         │                 │                │
│         │                 │                │
│         │  Vertical Video │                │  ← Centered video
│         │    1080x1920    │                │     Max-width: 500px
│         │                 │                │
│         │                 │                │
│         │   [▶️ PLAY]     │                │
│         │                 │                │
│         └─────────────────┘                │
│                                             │
│         ━━━●━━━━━━━━━ 0:45                │  ← Progress bar
│                                             │
│         🔊 ━━●───                          │  ← Volume
│                                             │
│         ● ○ ○                              │  ← Pagination dots
│        Video 1 of 3                        │
│                                             │
└─────────────────────────────────────────────┘
```

### Mobile Layout (< 768px)

```
┌──────────────────┐
│                  │
│                  │
│   Vertical Video │  ← Full width
│    Snap scroll   │     Centered
│                  │
│                  │
│    [▶️ PLAY]     │
│                  │
│                  │
│                  │
├──────────────────┤
│ ━━━●━━━━━ 0:45  │  ← Controls
├──────────────────┤
│  ● ○ ○           │  ← Dots
│ Video 1 of 3     │
└──────────────────┘

Swipe left/right to navigate →
```

---

## 🎬 Video Player Features

### Core Features:

1. **Play/Pause**:
   - Large play button overlay (click anywhere to play)
   - Tap video to pause (like Instagram)
   - Auto-pause when swipe to next video

2. **Progress bar**:
   - Seek by clicking/dragging
   - Show current time / total time
   - Smooth updates

3. **Volume control**:
   - Slider or tap to mute/unmute
   - Remember volume preference (localStorage)
   - Start muted by default (browser policy)

4. **Fullscreen** (optional):
   - Button to enter fullscreen
   - Mobile: Rotate to landscape → auto-fullscreen

5. **Video quality**:
   - Auto-detect và play appropriate quality
   - No manual quality selector (keep it simple)

---

## 🔄 Navigation Patterns

### Option 1: Swiper Carousel (Recommended)

**Library**: Swiper.js (https://swiperjs.com/)

**Config**:
```typescript
const swiperConfig = {
  direction: 'horizontal',
  slidesPerView: 1,
  centeredSlides: true,
  spaceBetween: 20,
  loop: false,
  grabCursor: true,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  mousewheel: {
    forceToAxis: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
    slideChange: (swiper) => {
      pauseAllVideos();
      // Optional: Auto-play video on new slide
    },
  },
};
```

**Features**:
- ✅ Smooth swipe gestures
- ✅ Snap to center
- ✅ Keyboard navigation (arrow keys)
- ✅ Mouse wheel support
- ✅ Touch friendly
- ✅ Pagination dots
- ✅ Prev/Next arrows

---

### Option 2: Native Scroll Snap

**No library**, use CSS scroll-snap:

```css
.video-carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  gap: 20px;
  padding: 20px;
}

.video-card {
  flex: 0 0 100%;
  scroll-snap-align: center;
  scroll-snap-stop: always;
}

/* Hide scrollbar */
.video-carousel::-webkit-scrollbar {
  display: none;
}
```

**Features**:
- ✅ No dependencies
- ✅ Native smooth scroll
- ✅ Lightweight
- ❌ Harder to customize
- ❌ Less control over events

**Recommendation**: Use Swiper.js cho better UX và control!

---

## 🎥 Video Card Component

### Structure:

```tsx
<div className="video-card">
  {/* Video container */}
  <div className="video-container">
    {!isPlaying && (
      <div className="video-thumbnail">
        <img src={poster} alt="Video thumbnail" />
        <button className="play-button-overlay">
          <PlayIcon size={64} />
        </button>
      </div>
    )}

    <video
      ref={videoRef}
      src={videoUrl}
      poster={poster}
      playsInline
      preload="metadata"
      className="video-player"
    />

    {/* Controls */}
    {isPlaying && (
      <div className="video-controls">
        <button onClick={togglePlay}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <div className="progress-bar" onClick={seek}>
          <div className="progress-filled" style={{ width: `${progress}%` }} />
        </div>

        <span className="time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        <button onClick={toggleMute}>
          {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
        </button>

        <button onClick={toggleFullscreen}>
          <FullscreenIcon />
        </button>
      </div>
    )}
  </div>

  {/* Caption */}
  <p className="video-caption">{caption}</p>
</div>
```

---

## 📱 Responsive Design

### Desktop (> 768px):
```css
.video-container {
  max-width: 500px;
  margin: 0 auto;
  aspect-ratio: 9 / 16;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### Mobile (< 768px):
```css
.video-container {
  width: 90vw;
  max-width: 400px;
  aspect-ratio: 9 / 16;
  margin: 0 auto;
}

/* Or full width */
.video-container {
  width: 100%;
  max-height: 80vh;
}
```

---

## ⚡ Performance Optimization

### 1. Lazy Loading Videos

**Only load video when in viewport**:

```typescript
import { useInView } from 'react-intersection-observer';

function VideoCard({ videoUrl, poster }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div ref={ref} className="video-card">
      {inView ? (
        <video src={videoUrl} poster={poster} />
      ) : (
        <div className="video-placeholder">
          <img src={poster} alt="Thumbnail" />
        </div>
      )}
    </div>
  );
}
```

---

### 2. Preload Strategy

**Load only current and next video**:

```typescript
function VideoCarousel({ videos }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Preload next video
    if (videos[currentIndex + 1]) {
      const nextVideo = document.createElement('video');
      nextVideo.src = videos[currentIndex + 1].url;
      nextVideo.preload = 'metadata';
    }
  }, [currentIndex]);

  return (
    <Swiper onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}>
      {videos.map((video, index) => (
        <SwiperSlide key={index}>
          <VideoCard
            video={video}
            shouldLoad={Math.abs(index - currentIndex) <= 1}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
```

---

### 3. Video Compression

**Target specs**:
- Resolution: 1080x1920 (vertical)
- Codec: H.264
- Bitrate: 3-4 Mbps (video) + 128 kbps (audio)
- File size: 15-25MB (for 30-60s video)

**FFmpeg command**:
```bash
ffmpeg -i input.mp4 \
  -vf "scale=1080:1920" \
  -c:v libx264 \
  -crf 23 \
  -preset medium \
  -c:a aac \
  -b:a 128k \
  output.mp4
```

---

### 4. Progressive Loading

**Show thumbnail immediately, load video in background**:

```tsx
function ProgressiveVideo({ videoUrl, poster }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="video-wrapper">
      {/* Always show thumbnail first */}
      <img
        src={poster}
        className={`thumbnail ${isLoaded ? 'fade-out' : ''}`}
      />

      {/* Load video in background */}
      <video
        src={videoUrl}
        poster={poster}
        onLoadedData={() => setIsLoaded(true)}
        className={`video ${isLoaded ? 'fade-in' : 'hidden'}`}
      />
    </div>
  );
}
```

---

## 🎨 Styling & Animations

### Romantic Theme:

```css
.video-carousel {
  background: linear-gradient(135deg, #FFB6C1 0%, #FFF8DC 100%);
  padding: 40px 20px;
  border-radius: 24px;
}

.video-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(183, 110, 121, 0.15);
}

.video-container {
  border: 3px solid rgba(255, 182, 193, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

/* Play button overlay */
.play-button-overlay {
  background: linear-gradient(135deg, #FFB6C1, #B76E79);
  color: white;
  border: none;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.play-button-overlay:hover {
  transform: scale(1.1);
}

/* Progress bar */
.progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  overflow: hidden;
}

.progress-filled {
  height: 100%;
  background: linear-gradient(90deg, #FFB6C1, #B76E79);
  transition: width 0.1s ease;
}
```

---

### Smooth Transitions:

```css
/* Fade in/out */
.fade-in {
  animation: fadeIn 0.3s ease-in;
}

.fade-out {
  animation: fadeOut 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

/* Slide transitions */
.swiper-slide {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.swiper-slide-active {
  transform: scale(1);
  opacity: 1;
}

.swiper-slide-prev,
.swiper-slide-next {
  transform: scale(0.9);
  opacity: 0.5;
}
```

---

## 🎯 Special Features for Daily Memories Event

### Enhanced Video Gallery:

```tsx
function DailyMemoriesVideoGallery({ videos }) {
  return (
    <section className="daily-memories-videos">
      <h2>📹 Video Moments</h2>
      <p className="subtitle">Những khoảnh khắc đáng nhớ</p>

      {/* Video carousel */}
      <Swiper {...swiperConfig}>
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <VideoCard
              video={video}
              index={index}
              total={videos.length}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Video grid alternative (for many videos) */}
      {videos.length > 5 && (
        <div className="video-grid-view">
          <button onClick={toggleGridView}>
            {isGridView ? 'Carousel View' : 'Grid View'}
          </button>
        </div>
      )}
    </section>
  );
}
```

---

### Video Grid View (for 5+ videos):

```css
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.video-grid-item {
  aspect-ratio: 9 / 16;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}

.video-grid-item:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

/* Thumbnail with play icon */
.video-grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-grid-item .play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
}
```

**When clicked → Open lightbox với video player carousel**

---

## 🧪 Testing Checklist

- [ ] **Videos load correctly**:
  - [ ] Vertical videos maintain aspect ratio (no distortion)
  - [ ] Desktop: Centered với max-width
  - [ ] Mobile: Full width, no overflow

- [ ] **Playback works**:
  - [ ] Play/pause on click
  - [ ] Seek with progress bar
  - [ ] Volume control
  - [ ] Mute/unmute
  - [ ] Auto-pause when swipe away

- [ ] **Navigation smooth**:
  - [ ] Swipe left/right works
  - [ ] Arrow buttons work
  - [ ] Keyboard arrows work
  - [ ] Pagination dots clickable
  - [ ] Snap to center

- [ ] **Performance**:
  - [ ] Videos lazy load
  - [ ] Only 1-2 videos loaded at a time
  - [ ] Smooth 60fps transitions
  - [ ] No lag when swiping

- [ ] **Responsive**:
  - [ ] Works on mobile (320px - 480px)
  - [ ] Works on tablet (768px - 1024px)
  - [ ] Works on desktop (> 1024px)

- [ ] **Edge cases**:
  - [ ] Single video (no swiper needed)
  - [ ] 10+ videos (grid view option)
  - [ ] Video load error (show fallback)
  - [ ] Slow network (show loading indicator)

---

## 📚 Implementation Example

### Full Component:

```tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function VerticalVideoGallery({ videos }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const swiperConfig = {
    modules: [Navigation, Pagination, Keyboard],
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 20,
    navigation: true,
    pagination: { clickable: true, dynamicBullets: true },
    keyboard: { enabled: true },
    onSlideChange: (swiper) => {
      setCurrentIndex(swiper.activeIndex);
      pauseAllVideos();
    },
  };

  const pauseAllVideos = () => {
    document.querySelectorAll('video').forEach(video => video.pause());
  };

  return (
    <div className="vertical-video-gallery">
      <h2>📹 Videos ({videos.length})</h2>

      <Swiper {...swiperConfig}>
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <VerticalVideoCard
              video={video}
              index={index}
              total={videos.length}
              shouldLoad={Math.abs(index - currentIndex) <= 1}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default VerticalVideoGallery;
```

---

## 🎯 Success Criteria

Vertical video gallery is successful when:
- ✅ Videos display beautifully (no stretch/distortion)
- ✅ Swipe navigation is smooth (60fps)
- ✅ Videos lazy load (performance)
- ✅ Controls are intuitive (play/pause/seek)
- ✅ Works perfectly on mobile & desktop
- ✅ Handles 2-10+ videos gracefully
- ✅ Romantic theme fits overall design
- ✅ User can easily navigate between videos

---

**Perfect for showcasing vertical videos in a modern, smooth way!** 📹💕
