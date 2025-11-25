const fs = require('fs');
const path = require('path');

// Paths
const TIMELINE_DIR = path.join(__dirname, '../public/data/timeline');
const OUTPUT_FILE = path.join(__dirname, '../src/data/timeline-data.json');

// Helper: Check if folder name matches YYYY-MM-DD_event-slug format
function parseEventFolder(folderName) {
  const match = folderName.match(/^(\d{4})-(\d{2})-(\d{2})_(.+)$/);
  if (!match) return null;

  const [, year, month, day, slug] = match;
  return {
    date: `${year}-${month}-${day}`,
    slug,
  };
}

// Helper: Get media files in a folder
function getMediaFiles(folderPath) {
  try {
    const files = fs.readdirSync(folderPath);

    const images = files.filter(f =>
      /\.(jpg|jpeg|png|webp|gif)$/i.test(f) && f !== 'cover.jpg'
    ).sort();

    const videos = files.filter(f =>
      /\.(mp4|webm|mov)$/i.test(f)
    ).sort();

    const hasCover = files.includes('cover.jpg');
    const hasNote = files.includes('note.txt');

    return {
      images,
      videos,
      hasCover,
      hasNote,
      totalMedia: images.length + videos.length,
    };
  } catch (error) {
    console.error(`Error reading folder ${folderPath}:`, error.message);
    return {
      images: [],
      videos: [],
      hasCover: false,
      hasNote: false,
      totalMedia: 0,
    };
  }
}

// Helper: Read note.txt if exists
function readNote(folderPath) {
  const notePath = path.join(folderPath, 'note.txt');
  try {
    if (fs.existsSync(notePath)) {
      return fs.readFileSync(notePath, 'utf-8').trim();
    }
  } catch (error) {
    console.error(`Error reading note.txt in ${folderPath}:`, error.message);
  }
  return '';
}

// Helper: Convert slug to title
function slugToTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Helper: Load existing timeline data to preserve manual edits
function loadExistingData() {
  try {
    if (fs.existsSync(OUTPUT_FILE)) {
      console.log('📖 Loading existing timeline data to preserve manual edits...');
      const data = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
      // Create a map of existing events by ID for quick lookup
      const eventMap = {};
      let feelingCount = 0;
      if (data.timeline && Array.isArray(data.timeline)) {
        data.timeline.forEach(event => {
          eventMap[event.id] = event;
          if (event.feeling) feelingCount++;
        });
      }
      console.log(`   ✅ Loaded ${Object.keys(eventMap).length} existing events`);
      console.log(`   💭 Found ${feelingCount} events with feelings to preserve`);
      return eventMap;
    } else {
      console.log('ℹ️  No existing timeline data found, will create new file');
    }
  } catch (error) {
    console.log('⚠️  Could not load existing data:', error.message);
  }
  return {};
}

// Main function to generate timeline data
function generateTimelineData() {
  console.log('🔍 Scanning timeline folders...\n');

  // Load existing data to preserve manual edits
  const existingEvents = loadExistingData();

  // Check if timeline directory exists
  if (!fs.existsSync(TIMELINE_DIR)) {
    console.error(`❌ Timeline directory not found: ${TIMELINE_DIR}`);
    console.log('Creating directory...');
    fs.mkdirSync(TIMELINE_DIR, { recursive: true });
    console.log('✅ Directory created. Please add event folders and run again.');
    return;
  }

  // Read all folders in timeline directory
  const folders = fs.readdirSync(TIMELINE_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  if (folders.length === 0) {
    console.log('⚠️  No event folders found in', TIMELINE_DIR);
    console.log('📝 Please create folders with format: YYYY-MM-DD_event-slug/');

    // Create empty timeline data
    const emptyData = {
      generated: new Date().toISOString(),
      count: 0,
      timeline: [],
    };

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(emptyData, null, 2));
    console.log('✅ Created empty timeline-data.json');
    return;
  }

  console.log(`📂 Found ${folders.length} folder(s):\n`);

  // Parse each folder and generate event data
  const events = [];

  folders.forEach((folderName, index) => {
    const parsed = parseEventFolder(folderName);

    if (!parsed) {
      console.log(`⚠️  Skipping invalid folder: ${folderName}`);
      console.log('   Expected format: YYYY-MM-DD_event-slug\n');
      return;
    }

    const folderPath = path.join(TIMELINE_DIR, folderName);
    const media = getMediaFiles(folderPath);
    const note = readNote(folderPath);

    // Check if we have existing data for this event
    const existingEvent = existingEvents[parsed.slug];
    const hasExistingFeeling = existingEvent?.feeling ? true : false;

    const event = {
      id: parsed.slug,
      date: parsed.date,
      // Preserve manually edited title or use generated one
      title: existingEvent?.title || slugToTitle(parsed.slug),
      // Preserve manually edited description or use note/generated one
      description: existingEvent?.description || note || `Memories from ${slugToTitle(parsed.slug)}`,
      // Preserve manually edited feeling
      feeling: existingEvent?.feeling || undefined,
      location: existingEvent?.location || '', // Preserve existing location
      folder: folderName,
      mediaCount: {
        images: media.images.length,
        videos: media.videos.length,
        total: media.totalMedia,
      },
      mediaFiles: {
        images: media.images,
        videos: media.videos,
      },
      hasCover: media.hasCover,
      hasNote: media.hasNote,
      tags: existingEvent?.tags || [], // Preserve existing tags
    };

    // Remove undefined feeling field if not present
    if (!event.feeling) {
      delete event.feeling;
    }

    events.push(event);

    // Log if feeling was preserved
    if (hasExistingFeeling) {
      console.log(`   💭 Preserved feeling for: ${event.title}`);
    }

    // Log event info
    console.log(`${index + 1}. ${folderName}`);
    console.log(`   📅 Date: ${event.date}`);
    console.log(`   📖 Title: ${event.title}`);
    console.log(`   🖼️  Images: ${media.images.length}`);
    console.log(`   🎥 Videos: ${media.videos.length}`);
    console.log(`   ${media.hasCover ? '✅' : '❌'} Cover image`);
    console.log(`   ${media.hasNote ? '✅' : '❌'} Note file`);
    console.log('');
  });

  // Sort events by date (oldest first)
  events.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Create timeline data object
  const timelineData = {
    generated: new Date().toISOString(),
    count: events.length,
    timeline: events,
  };

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write to JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(timelineData, null, 2));

  // Count preserved feelings
  const feelingsCount = events.filter(e => e.feeling).length;

  console.log('─'.repeat(50));
  console.log('✅ Timeline data generated successfully!');
  console.log(`📄 Output: ${OUTPUT_FILE}`);
  console.log(`📊 Total events: ${events.length}`);
  console.log(`💭 Events with feelings: ${feelingsCount}`);
  console.log(`📸 Total images: ${events.reduce((sum, e) => sum + e.mediaCount.images, 0)}`);
  console.log(`🎥 Total videos: ${events.reduce((sum, e) => sum + e.mediaCount.videos, 0)}`);
  console.log('─'.repeat(50));
}

// Run the generator
try {
  generateTimelineData();
} catch (error) {
  console.error('❌ Error generating timeline data:', error);
  process.exit(1);
}
