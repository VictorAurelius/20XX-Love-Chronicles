import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import MusicPlayer from '@/components/MusicPlayer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* Timeline section */}
        <section id="timeline" className="min-h-screen bg-romantic-warmWhite">
          <Timeline />
        </section>
      </main>

      {/* Music Player - sticky at bottom */}
      <MusicPlayer />
    </>
  );
}
