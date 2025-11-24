# Music Player Technical Specification

Spec chi tiết cho music player component với shuffle/random support trên static website.

---

## 🎯 Overview

**Music Player** là component phát nhạc nền cho website, support:
- Multiple songs playlist
- Shuffle/Random modes
- Persistent user preferences
- Special event music prioritization
- Romantic UI design

---

## 🎵 Core Features

### 1. Playlist Management

#### Auto-detect songs:
```typescript
// src/lib/music-loader.ts
export async function loadMusicPlaylist(): Promise<Song[]> {
  // Scan public/data/music/ folder at build time
  // Return array of song objects
  const songs = [
    { id: '01', filename: '01-di-ve-nha.mp3', title: 'Đi Về Nhà', artist: 'Đen' },
    { id: '02', filename: '02-photograph.mp3', title: 'Photograph', artist: 'Ed Sheeran' },
    // ...
  ];
  return songs;
}
```

#### Song metadata extraction:
- From filename: `01-di-ve-nha-den.mp3` → Title: "Di Ve Nha", Artist: "Den"
- Or from ID3 tags (if available)
- Or from separate `playlist.json` file (optional)

---

### 2. Playback Modes

#### Random Mode (Default on page load):
```typescript
function getRandomSong(playlist: Song[], exclude?: string[]): Song {
  const available = playlist.filter(song => !exclude?.includes(song.id));
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}
```

- Mỗi lần load page → Random 1 bài
- Store last played songs trong localStorage để không lặp

#### Shuffle Mode:
```typescript
function shufflePlaylist(playlist: Song[]): Song[] {
  // Fisher-Yates shuffle algorithm
  const shuffled = [...playlist];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
```

- Shuffle toàn bộ playlist
- Play theo order mới
- Khi hết playlist → Re-shuffle

#### Sequential Mode:
- Play theo thứ tự A→Z
- Loop lại khi hết

#### Repeat Modes:
- **Off**: Dừng khi hết playlist
- **Loop One**: Lặp lại bài hiện tại
- **Loop All**: Lặp lại toàn bộ playlist

---

### 3. Playback Controls

#### Core controls:
```typescript
interface MusicPlayerControls {
  play(): void;
  pause(): void;
  next(): void;
  previous(): void;
  setVolume(level: number): void;  // 0-1
  toggleShuffle(): void;
  toggleRepeat(): void;  // off -> one -> all -> off
  seek(time: number): void;
}
```

#### HTML5 Audio API:
```typescript
const audio = new Audio();
audio.src = '/data/music/song.mp3';
audio.volume = 0.7;
audio.play();
audio.pause();
audio.currentTime = 30;  // Seek to 30s

// Events
audio.addEventListener('ended', onSongEnd);
audio.addEventListener('timeupdate', onProgress);
audio.addEventListener('loadedmetadata', onLoad);
```

---

### 4. User Preferences (localStorage)

```typescript
interface MusicPreferences {
  volume: number;           // 0-1
  shuffleEnabled: boolean;
  repeatMode: 'off' | 'one' | 'all';
  lastPlayed: string[];     // Song IDs
  isPaused: boolean;        // User manually paused
}

// Save preferences
function savePreferences(prefs: MusicPreferences) {
  localStorage.setItem('music-prefs', JSON.stringify(prefs));
}

// Load preferences
function loadPreferences(): MusicPreferences {
  const stored = localStorage.getItem('music-prefs');
  return stored ? JSON.parse(stored) : DEFAULT_PREFS;
}
```

**Use cases**:
- Remember volume → Next visit same volume
- Remember shuffle on → Next visit shuffle still on
- User paused music → Don't autoplay next visit
- Remember last 5 songs → Avoid repeating immediately

---

### 5. Auto-play Behavior

**Browser restriction**: Cannot autoplay with sound without user interaction!

**Solution**:
```typescript
// Show floating "Play Music" button
<FloatingMusicButton onClick={startMusic} />

function startMusic() {
  const prefs = loadPreferences();
  if (!prefs.isPaused) {
    audio.play();
    setShowPlayer(true);
  }
}
```

**Flow**:
1. Page load → Music player hidden, show floating button
2. User clicks button → Start playing, show full player
3. Remember user preference → Next visit auto-show player (but need click to play)

---

### 6. Event-Specific Music (Birthday Special)

**QUAN TRỌNG**: Birthday events CHỈ phát nhạc birthday, KHÔNG phát playlist bình thường!

#### Logic Flow:

```typescript
interface MusicContext {
  currentEvent?: Event;
  currentDate: Date;
  isViewingEvent: boolean;
}

function selectMusicForContext(context: MusicContext): Song | Song[] {
  // 1. Check if user is viewing a birthday event
  if (context.isViewingEvent && context.currentEvent?.type === 'birthday') {
    // CHỈ play birthday music, KHÔNG shuffle playlist
    return getBirthdayMusic(context.currentEvent);
  }

  // 2. Check if today is a birthday (date-based)
  const birthdayEvent = getTodayBirthdayEvent(context.currentDate);
  if (birthdayEvent) {
    // Auto-play birthday music
    return getBirthdayMusic(birthdayEvent);
  }

  // 3. Default: Play normal playlist with shuffle
  return getShuffledPlaylist();
}

function getBirthdayMusic(event: Event): Song {
  // Map event to specific birthday song
  const birthdayMusicMap = {
    'boyfriend-birthday': 'birthday-boy.mp3',
    'girlfriend-birthday': 'birthday-girl.mp3',
  };

  const filename = birthdayMusicMap[event.id] || 'birthday-special.mp3';

  const birthdaySong = playlist.find(s => s.filename === filename);

  if (!birthdaySong) {
    // Fallback: find any file with "birthday" in name
    return playlist.find(s => s.filename.includes('birthday'));
  }

  return birthdaySong;
}
```

#### Event Navigation Behavior:

```typescript
// When user opens a story card
function onEventOpen(event: Event) {
  if (event.type === 'birthday') {
    // Pause current playlist
    pauseCurrentMusic();

    // Play birthday music
    const birthdaySong = getBirthdayMusic(event);
    playMusic(birthdaySong, { loop: true }); // Loop birthday song!

    // Update UI to show "Birthday Music Playing"
    updateMusicPlayerUI({
      mode: 'event-specific',
      eventName: event.title,
    });
  }
}

// When user closes story card
function onEventClose(event: Event) {
  if (event.type === 'birthday') {
    // Stop birthday music
    stopCurrentMusic();

    // Resume normal playlist from where it was
    resumePlaylist();

    // Update UI back to normal
    updateMusicPlayerUI({
      mode: 'playlist',
    });
  }
}
```

#### UI Indicators:

Khi đang phát birthday music, player cần show:
- 🎂 Birthday icon
- Message: "Happy Birthday! 🎉" hoặc "Sinh Nhật Vui Vẻ!"
- Disable Next/Previous buttons (vì chỉ có 1 bài birthday)
- Enable Loop (tự động loop birthday song)

```tsx
{isBirthdayMode && (
  <div className="birthday-indicator">
    <span>🎂 Birthday Special Music</span>
    <span>Loop: ON</span>
  </div>
)}
```

---

### 7. Music Files Structure with Birthday Subfolder

#### Structure:
```
public/data/music/
├── 01-di-ve-nha.mp3              # Normal playlist
├── 02-photograph.mp3             # Normal playlist
├── 03-3107.mp3                   # Normal playlist
├── 04-yeu-la-cuoi.mp3           # Normal playlist
├── 05-thinking-out-loud.mp3     # Normal playlist
├── ... (5-10 bài cho normal browsing)
└── birthday/                      # Birthday music subfolder
    ├── 01-happy-birthday.mp3     # Birthday playlist
    ├── 02-birthday-song.mp3      # Birthday playlist
    ├── 03-sinh-nhat-vui-ve.mp3  # Birthday playlist
    ├── 04-celebration.mp3        # Birthday playlist
    └── ... (3-10 bài birthday)
```

#### Loading Logic:
```typescript
interface MusicPlaylists {
  normal: Song[];      // Songs from music/ root
  birthday: Song[];    // Songs from music/birthday/
}

async function loadMusicPlaylists(): Promise<MusicPlaylists> {
  // Load normal playlist (root level)
  const normalSongs = await scanMusicFolder('public/data/music/', {
    excludeDirs: ['birthday']  // KHÔNG include subfolder birthday
  });

  // Load birthday playlist (subfolder)
  const birthdaySongs = await scanMusicFolder('public/data/music/birthday/');

  return {
    normal: normalSongs,
    birthday: birthdaySongs,
  };
}
```

#### Event Music Assignment:
```typescript
const EVENT_MUSIC_MAP = {
  '2025-09-30_boyfriend-birthday': {
    type: 'birthday-playlist',  // Use birthday playlist
    shuffle: true,              // Shuffle trong birthday songs
  },
  '2025-12-10_girlfriend-birthday': {
    type: 'birthday-playlist',  // Use birthday playlist
    shuffle: true,              // Shuffle trong birthday songs
  },
  // Other events: null (use normal playlist)
};

function getMusicForEvent(eventId: string, playlists: MusicPlaylists) {
  const config = EVENT_MUSIC_MAP[eventId];

  if (config?.type === 'birthday-playlist') {
    return {
      type: 'birthday',
      playlist: playlists.birthday,
      shuffle: config.shuffle,
    };
  }

  // Default: normal playlist
  return {
    type: 'normal',
    playlist: playlists.normal,
    shuffle: true,
  };
}
```

#### Birthday Playlist Behavior:
```typescript
function playBirthdayPlaylist(songs: Song[]) {
  if (songs.length === 0) {
    console.error('No birthday songs found!');
    return;
  }

  // Shuffle birthday playlist
  const shuffled = shufflePlaylist(songs);

  // Play first song
  const firstSong = shuffled[0];
  playMusic(firstSong);

  // Setup auto-next (cycle through birthday songs)
  audio.addEventListener('ended', () => {
    const currentIndex = shuffled.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % shuffled.length;
    playMusic(shuffled[nextIndex]);
  });

  // Update UI
  updateUI({
    mode: 'birthday',
    playlist: shuffled,
    currentIndex: 0,
  });
}
```

---

## 🎨 UI Design

### Mini Player (Collapsed State)

**Position**: Fixed bottom-right corner
**Size**: 60px × 60px (circular)

```
┌─────────────┐
│   🎵 ▶️     │  ← Floating button
└─────────────┘
```

**Features**:
- Show play/pause icon
- Pulse animation when playing
- Click to expand

---

### Full Player (Expanded State)

**Position**: Fixed bottom-right corner
**Size**: 320px × 180px (rounded rectangle)

```
┌────────────────────────────┐
│  🎵 Now Playing            │
│  ────────────────────      │
│  "Đi Về Nhà" - Đen        │
│                            │
│  ●━━━━━━━●────────── 2:15 │  ← Progress bar
│                            │
│  🔀  ⏮️  ⏯️  ⏭️  🔁       │  ← Controls
│                            │
│  🔊 ━━━●──────            │  ← Volume
└────────────────────────────┘
```

**Components**:
- Album art (couple avatar or default romantic icon)
- Song title + artist
- Progress bar with time
- Playback controls:
  - Shuffle toggle
  - Previous track
  - Play/Pause (large button)
  - Next track
  - Repeat toggle
- Volume slider
- Minimize button

---

### Color Theme (Romantic)

```css
--player-bg: linear-gradient(135deg, #FFB6C1 0%, #B76E79 100%);
--player-text: #FFFFFF;
--player-accent: #FFD700;
--player-shadow: 0 8px 32px rgba(183, 110, 121, 0.4);
--player-border: 1px solid rgba(255, 255, 255, 0.2);
```

**Glassmorphism effect**:
```css
.music-player {
  background: rgba(255, 182, 193, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: var(--player-shadow);
}
```

---

## 🔧 Technical Implementation

### Component Structure (React/Next.js)

```
src/components/MusicPlayer/
├── MusicPlayer.tsx           # Main component
├── MiniPlayer.tsx            # Collapsed button
├── FullPlayer.tsx            # Expanded player
├── ProgressBar.tsx           # Seek bar
├── VolumeSlider.tsx          # Volume control
├── PlaybackControls.tsx      # Buttons
└── useMusicPlayer.ts         # Custom hook
```

### Main Hook: `useMusicPlayer.ts`

```typescript
export function useMusicPlayer() {
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [shuffleEnabled, setShuffleEnabled] = useState(true);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off');

  const audioRef = useRef<HTMLAudioElement>(null);

  // Load playlist on mount
  useEffect(() => {
    loadMusicPlaylist().then(setPlaylist);
    const prefs = loadPreferences();
    setVolume(prefs.volume);
    setShuffleEnabled(prefs.shuffleEnabled);
    setRepeatMode(prefs.repeatMode);
  }, []);

  // Play function
  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  // Pause function
  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Next song
  const next = useCallback(() => {
    if (!playlist.length) return;

    const currentIndex = playlist.findIndex(s => s.id === currentSong?.id);
    let nextSong: Song;

    if (shuffleEnabled) {
      nextSong = getRandomSong(playlist, [currentSong?.id || '']);
    } else {
      const nextIndex = (currentIndex + 1) % playlist.length;
      nextSong = playlist[nextIndex];
    }

    setCurrentSong(nextSong);
  }, [playlist, currentSong, shuffleEnabled]);

  // Previous song
  const previous = useCallback(() => {
    // Similar logic
  }, []);

  // On song end
  const handleSongEnd = useCallback(() => {
    if (repeatMode === 'one') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else if (repeatMode === 'all' || shuffleEnabled) {
      next();
    } else {
      // Stop
      setIsPlaying(false);
    }
  }, [repeatMode, shuffleEnabled, next]);

  // Save preferences on change
  useEffect(() => {
    savePreferences({
      volume,
      shuffleEnabled,
      repeatMode,
      lastPlayed: [],  // Track history
      isPaused: !isPlaying,
    });
  }, [volume, shuffleEnabled, repeatMode, isPlaying]);

  return {
    currentSong,
    isPlaying,
    progress,
    volume,
    shuffleEnabled,
    repeatMode,
    play,
    pause,
    next,
    previous,
    setVolume,
    toggleShuffle: () => setShuffleEnabled(!shuffleEnabled),
    toggleRepeat: () => {
      const modes: RepeatMode[] = ['off', 'one', 'all'];
      const currentIndex = modes.indexOf(repeatMode);
      setRepeatMode(modes[(currentIndex + 1) % modes.length]);
    },
  };
}
```

---

## 📱 Responsive Design

### Desktop (> 768px):
- Full player 320px × 180px
- Bottom-right corner with 24px margin

### Tablet (768px - 480px):
- Slightly smaller: 280px × 160px
- Bottom-right corner with 16px margin

### Mobile (< 480px):
- Full-width bottom bar: 100% × 80px
- Simplified controls (hide shuffle/repeat by default)
- Swipe up to expand

---

## ⚡ Performance Optimization

### 1. Lazy Loading:
```typescript
// Only load first song immediately
const [currentSong, setCurrentSong] = useState<Song | null>(null);

useEffect(() => {
  if (currentSong) {
    audioRef.current = new Audio(`/data/music/${currentSong.filename}`);
    audioRef.current.load();
  }
}, [currentSong]);
```

### 2. Preload next song:
```typescript
useEffect(() => {
  if (currentSong && playlist.length > 1) {
    const nextSong = getNextSong(playlist, currentSong);
    const preload = new Audio(`/data/music/${nextSong.filename}`);
    preload.preload = 'auto';
  }
}, [currentSong, playlist]);
```

### 3. Debounce volume changes:
```typescript
const debouncedSetVolume = useMemo(
  () => debounce((value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  }, 100),
  []
);
```

---

## 🧪 Testing Checklist

- [ ] Play/Pause functionality
- [ ] Next/Previous track
- [ ] Volume control (0-100%)
- [ ] Shuffle mode (no immediate repeats)
- [ ] Repeat modes (off/one/all)
- [ ] Progress bar seek
- [ ] localStorage persistence
- [ ] Birthday song prioritization
- [ ] Auto-detect all MP3 files
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] Browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Performance with 10+ songs
- [ ] Graceful fallback if no music files
- [ ] Minimize/Expand animations

---

## 🚀 Future Enhancements (Phase 2)

- [ ] Playlist view (show all songs, click to play)
- [ ] Song search/filter
- [ ] Download song button
- [ ] Share current song
- [ ] Lyrics display
- [ ] Visualizer (audio spectrum)
- [ ] Equalizer (bass/treble controls)
- [ ] Keyboard shortcuts (space to play/pause, arrows for next/prev)
- [ ] Integration với Spotify/Apple Music (embed instead of upload)

---

## 📚 Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^10.x",  // For animations
    "react-icons": "^4.x",      // For player icons
    "react-use": "^17.x"        // For useAudio hook (optional)
  }
}
```

---

## 🎯 Success Criteria

Music player is successful when:
- ✅ Auto-detects all songs in folder
- ✅ Shuffle works without repeating recently played
- ✅ User preferences persist across sessions
- ✅ Birthday songs prioritized on special days
- ✅ Smooth animations, no lag
- ✅ Works on all modern browsers
- ✅ Mobile-friendly controls
- ✅ Beautiful romantic design fits website theme

---

**Ready to implement the ultimate romantic music player!** 🎵💕
