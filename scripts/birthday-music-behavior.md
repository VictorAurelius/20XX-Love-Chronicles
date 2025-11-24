# Birthday Music Behavior - Detailed Specification

Chi tiết cách music player hoạt động với birthday events.

---

## 🎯 Requirement

**"Tôi muốn vào 2 event birthday thì chỉ phát nhạc birthday"**

→ Khi user vào/xem birthday events → CHỈ phát nhạc sinh nhật, KHÔNG phát playlist background bình thường.

---

## 🎵 Music Modes

### Mode 1: Playlist Mode (Default)

**Khi nào**: Duyệt web bình thường, xem các events khác (không phải birthday)

**Hành vi**:
- Phát playlist background (5-10 bài)
- Shuffle/random order
- Next/Previous enabled
- Volume control
- Repeat modes (off/one/all)

**Songs**:
```
01-di-ve-nha.mp3
02-photograph.mp3
03-3107.mp3
04-yeu-la-cuoi.mp3
...
```

---

### Mode 2: Birthday Playlist Mode

**Khi nào**: User vào/xem birthday events

**Hành vi**:
- ❌ KHÔNG phát playlist bình thường (từ music/ root)
- ✅ CHỈ shuffle/random các bài trong `music/birthday/` subfolder
- Shuffle trong birthday playlist
- Next/Previous enabled (giữa các bài birthday)
- Repeat all birthday songs (loop playlist)
- Volume control vẫn hoạt động
- Show UI indicator: "🎂 Birthday Playlist Playing"

**Songs folder**:
```
music/birthday/
├── 01-happy-birthday-vietnamese.mp3
├── 02-happy-birthday-english.mp3
├── 03-celebration.mp3
├── 04-birthday-acoustic.mp3
└── 05-sinh-nhat-vui-ve.mp3
```

**Behavior**: Shuffle giữa 5 bài này, có thể skip Next/Previous, loop playlist khi hết

---

## 📋 Scenarios & Behaviors

### Scenario 1: User duyệt timeline bình thường

**Timeline**: Home → Timeline scroll → View các events (không phải birthday)

**Music**:
- ✅ Playlist mode
- Random song on page load
- Shuffle enabled
- Can skip Next/Previous

**Example**:
```
Page load → Random: "Photograph" by Ed Sheeran
User clicks Next → "Đi Về Nhà" by Đen
User clicks Next → "3107" by Duongg
```

---

### Scenario 2: User click vào boyfriend birthday event

**Timeline**: Home → Timeline → **Click "Sinh Nhật Bạn Trai" card**

**Music behavior**:
```
1. Pause current song (e.g., "Photograph")
2. Switch to Birthday Playlist Mode
3. Load birthday playlist từ music/birthday/ (5 bài)
4. Shuffle birthday playlist
5. Play random first song: "Happy Birthday Vietnamese"
6. Update UI:
   - Show: "🎂 Birthday Playlist Playing"
   - Show: "Shuffle: ON (within birthday songs)"
   - Show: "Repeat: ALL"
   - Next/Previous enabled (giữa các bài birthday)
7. User can:
   - Adjust volume
   - Click Next → "Celebration"
   - Click Next → "Birthday Acoustic"
   - Click Next → "Happy Birthday English"
   - When hết playlist → Loop back to first song
```

**When user closes event**:
```
1. Stop birthday playlist
2. Resume normal playlist mode
3. Continue from paused song ("Photograph") or play next
4. Update UI back to normal
5. Back to normal controls
```

---

### Scenario 3: User click vào girlfriend birthday event

**Timeline**: Timeline → **Click "Sinh Nhật Bạn Gái" card**

**Music behavior**:
```
1. Pause current playlist
2. Switch to Birthday Playlist Mode
3. Load & shuffle birthday playlist từ music/birthday/
4. Play random first song: "Birthday Acoustic"
5. Show special UI:
   - "🎂💕 Sinh Nhật Em Yêu!"
   - Rose petals animation
   - Fireworks effect
   - "Birthday Playlist Playing"
6. User có thể Next/Previous giữa các bài birthday
7. Birthday playlist loops
8. When close → Resume normal playlist
```

---

### Scenario 4: User vào đúng ngày sinh nhật (Date-based)

**Date**: Hôm nay là 9/30 (sinh nhật bạn trai)

**Music behavior**:
```
Page load:
1. Detect today = 9/30
2. Auto-start Birthday Playlist Mode
3. Load & shuffle birthday playlist từ music/birthday/
4. Play random song from birthday playlist
5. Show birthday banner on homepage
6. Music shuffles through all birthday songs
7. If user closes birthday banner → Switch back to normal playlist mode
```

**Date**: Hôm nay là 12/10 (sinh nhật bạn gái)

```
Page load:
1. Detect today = 12/10
2. Auto-start Birthday Playlist Mode
3. Load & shuffle birthday playlist từ music/birthday/
4. Play random song from birthday playlist
5. Show special birthday hero section (replace normal hero)
6. Fireworks + rose petals effects
7. Birthday playlist shuffles & loops
8. Can skip Next/Previous between birthday songs
```

---

### Scenario 5: User navigate giữa các events

**Timeline**: User đang xem confession event → Click sang Ninh Binh trip → Click sang boyfriend birthday

**Music behavior**:

```
1. Confession event (open):
   - Playlist mode
   - Playing: "3107" by Duongg

2. Click Ninh Binh trip:
   - Playlist continues
   - Same song or shuffle to next
   - Playing: "3107" continues

3. Click boyfriend birthday:
   - ⚠️ SWITCH to Birthday Playlist Mode
   - Pause "3107"
   - Load & shuffle birthday playlist
   - Play random: "Happy Birthday Vietnamese"
   - Show birthday UI
   - Can skip Next/Previous between birthday songs

4. Close birthday, back to timeline:
   - Resume playlist mode
   - Continue "3107" or next song
```

---

## 🎨 UI States

### Playlist Mode UI

```
┌────────────────────────────┐
│  🎵 Now Playing            │
│  ────────────────────      │
│  "Đi Về Nhà" - Đen        │
│                            │
│  ●━━━━━━━●────────── 2:15 │
│                            │
│  🔀  ⏮️  ⏯️  ⏭️  🔁       │  ← All buttons enabled
│                            │
│  🔊 ━━━●──────            │
└────────────────────────────┘
```

### Birthday Playlist Mode UI

```
┌────────────────────────────┐
│  🎂 Birthday Playlist      │
│  ────────────────────      │
│  "Happy Birthday!"         │
│  (Vietnamese Version)      │
│                            │
│  ●━━━━━━━━━━━━━━━━━ 2:45 │
│                            │
│  🔀  ⏮️  ⏯️  ⏭️  🔁       │  ← All buttons ENABLED
│  ✓   ✓   ✓   ✓   ✓       │
│                            │
│  🔊 ━━━●──────            │  ← Volume works
│                            │
│  Playlist: 5 birthday songs│
│  Shuffle: ON | Repeat: ALL│
└────────────────────────────┘

Indicator: "🔁 Shuffling Birthday Playlist (5 songs)"
```

---

## 🔧 Implementation Logic

### Core State Management

```typescript
interface MusicPlayerState {
  mode: 'normal-playlist' | 'birthday-playlist';
  currentSong: Song | null;
  normalPlaylist: Song[];      // Songs from music/ root
  birthdayPlaylist: Song[];    // Songs from music/birthday/
  isPlaying: boolean;
  volume: number;
  shuffleEnabled: boolean;
  repeatMode: 'off' | 'one' | 'all';
  currentEvent?: Event;  // Track which event is open
  currentPlaylistIndex: number;  // Track position in current playlist
}
```

### Event Handlers

```typescript
// When user opens an event
function handleEventOpen(event: Event) {
  if (event.type === 'birthday') {
    switchToBirthdayMode(event);
  }
  // For other events, do nothing (keep playlist playing)
}

// When user closes an event
function handleEventClose(event: Event) {
  if (event.type === 'birthday') {
    switchToPlaylistMode();
  }
}

// Switch to birthday mode
function switchToBirthdayMode(event: Event) {
  // 1. Save current normal playlist state
  savePlaylistState({
    song: currentSong,
    position: audio.currentTime,
    index: currentPlaylistIndex,
  });

  // 2. Pause current playback
  audio.pause();

  // 3. Load & shuffle birthday playlist
  const shuffledBirthday = shufflePlaylist(birthdayPlaylist);

  // 4. Play random first song from birthday playlist
  const firstSong = shuffledBirthday[0];
  audio.src = `/data/music/birthday/${firstSong.filename}`;
  audio.loop = false;  // Don't loop single song
  audio.play();

  // 5. Setup auto-next for birthday playlist
  audio.addEventListener('ended', () => {
    playNextBirthdaySong(shuffledBirthday);
  });

  // 6. Update state
  setState({
    mode: 'birthday-playlist',
    currentSong: firstSong,
    currentEvent: event,
    currentPlaylistIndex: 0,
    shuffleEnabled: true,
    repeatMode: 'all',  // Repeat all birthday songs
  });

  // 7. Update UI
  updateUI('birthday-playlist');
}

// Play next song in birthday playlist
function playNextBirthdaySong(playlist: Song[]) {
  const nextIndex = (currentPlaylistIndex + 1) % playlist.length;
  const nextSong = playlist[nextIndex];

  audio.src = `/data/music/birthday/${nextSong.filename}`;
  audio.play();

  setState({
    currentSong: nextSong,
    currentPlaylistIndex: nextIndex,
  });
}

// Switch back to normal playlist mode
function switchToPlaylistMode() {
  // 1. Stop birthday playlist
  audio.pause();
  audio.removeEventListener('ended', playNextBirthdaySong);

  // 2. Restore normal playlist
  const savedState = getPlaylistState();

  if (savedState) {
    // Resume from where we left off
    audio.src = `/data/music/${savedState.song.filename}`;
    audio.currentTime = savedState.position;
    audio.play();

    setState({
      currentPlaylistIndex: savedState.index,
    });
  } else {
    // Start fresh with random song from normal playlist
    const shuffled = shufflePlaylist(normalPlaylist);
    const randomSong = shuffled[0];
    audio.src = `/data/music/${randomSong.filename}`;
    audio.play();

    setState({
      currentPlaylistIndex: 0,
    });
  }

  // 3. Update state
  setState({
    mode: 'normal-playlist',
    currentEvent: null,
  });

  // 4. Update UI
  updateUI('normal-playlist');
}
```

---

## 📂 File Structure (Updated with Birthday Subfolder)

```
public/data/music/
├── 01-di-ve-nha.mp3              # NORMAL PLAYLIST
├── 02-photograph.mp3             # NORMAL PLAYLIST
├── 03-3107.mp3                   # NORMAL PLAYLIST
├── 04-yeu-la-cuoi.mp3           # NORMAL PLAYLIST
├── 05-thinking-out-loud.mp3     # NORMAL PLAYLIST
├── 06-all-of-me.mp3             # NORMAL PLAYLIST
├── 07-perfect.mp3                # NORMAL PLAYLIST
├── 08-river-flows-in-you.mp3    # NORMAL PLAYLIST
└── birthday/                      # BIRTHDAY SUBFOLDER ⭐
    ├── 01-happy-birthday-vietnamese.mp3
    ├── 02-happy-birthday-english.mp3
    ├── 03-celebration.mp3
    ├── 04-birthday-acoustic.mp3
    └── 05-sinh-nhat-vui-ve.mp3
```

**Total**: 13 files (8 normal + 5 birthday)

**Categorization**:
- **Normal Playlist** (8 files in root): Shuffle/random during normal browsing
- **Birthday Playlist** (5 files in birthday/): Shuffle ONLY within birthday songs during birthday events
- **Separation**: Birthday folder KHÔNG bao giờ được include trong normal playlist!

---

## ✅ Testing Checklist

- [ ] **Playlist mode works**:
  - [ ] Random song on page load
  - [ ] Shuffle enabled
  - [ ] Next/Previous skip songs
  - [ ] Repeat modes work

- [ ] **Birthday playlist mode works**:
  - [ ] Click boyfriend birthday → Load birthday playlist from music/birthday/
  - [ ] Click girlfriend birthday → Load birthday playlist from music/birthday/
  - [ ] Playlist shuffles automatically
  - [ ] Next/Previous enabled (giữa các bài birthday)
  - [ ] Repeat all birthday songs (loop playlist)
  - [ ] UI shows "Birthday Playlist Playing"
  - [ ] Show playlist count (e.g., "5 birthday songs")

- [ ] **Mode switching works**:
  - [ ] Open birthday event → Switch to exclusive
  - [ ] Close birthday event → Resume playlist
  - [ ] Playlist position restored correctly

- [ ] **Date-based auto-play works**:
  - [ ] On 9/30 → Auto-play random song from birthday/
  - [ ] On 12/10 → Auto-play random song from birthday/
  - [ ] Birthday playlist shuffles throughout the day

- [ ] **Edge cases**:
  - [ ] If birthday/ folder empty → Show error, continue with normal playlist
  - [ ] If birthday/ has only 1 song → Still works (loops that 1 song)
  - [ ] Volume control works in both modes
  - [ ] User manually pause → Don't auto-resume
  - [ ] Shuffle between 5+ birthday songs works without immediate repeats

---

## 🎯 Success Criteria

Birthday music feature is successful when:
- ✅ Birthday events play ONLY birthday music from `music/birthday/` (no normal playlist)
- ✅ Birthday playlist shuffles & loops with variety (3-10 songs)
- ✅ Next/Previous works within birthday playlist
- ✅ Normal playlist resumes when exiting birthday event
- ✅ UI clearly indicates birthday playlist mode (show song count)
- ✅ Date-based auto-play works on actual birthdays (9/30, 12/10)
- ✅ No bugs when switching between modes
- ✅ Separation between normal and birthday folders is maintained
- ✅ User experience is smooth and delightful with variety

---

**Birthday playlist = Multiple songs for celebration variety! 🎂🎵💕**
