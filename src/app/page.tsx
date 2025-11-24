import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import MusicPlayer from '@/components/MusicPlayer';
import FloatingHearts from '@/components/animations/FloatingHearts';
import Sparkles from '@/components/animations/Sparkles';
import ParticleBackground from '@/components/animations/ParticleBackground';
import AnimatedGradient from '@/components/animations/AnimatedGradient';
import FloralDecoration from '@/components/animations/FloralDecoration';

export default function Home() {
  return (
    <>
      {/* Background animations */}
      <AnimatedGradient />
      <ParticleBackground />
      <Sparkles />
      <FloatingHearts />
      <FloralDecoration />

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
