import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import EventDetail from '@/components/EventDetail';
import MusicPlayer from '@/components/MusicPlayer';
import timelineData from '@/data/timeline-data.json';
import ParticleBackground from '@/components/animations/ParticleBackground';
import Sparkles from '@/components/animations/Sparkles';
import FloatingHearts from '@/components/animations/FloatingHearts';
import FloralDecoration from '@/components/animations/FloralDecoration';

interface PageProps {
  params: {
    id: string;
  };
}

// Generate static paths for all events
export async function generateStaticParams() {
  return timelineData.timeline.map((event) => ({
    id: event.id,
  }));
}

export default function EventPage({ params }: PageProps) {
  const event = timelineData.timeline.find((e) => e.id === params.id);

  if (!event) {
    notFound();
  }

  // Check if this is a birthday event
  const isBirthdayEvent =
    params.id === 'boyfriend-birthday' ||
    params.id === 'girlfriend-birthday';

  return (
    <>
      {/* Background animations */}
      <ParticleBackground />
      <Sparkles />
      {isBirthdayEvent && <FloatingHearts />}
      <FloralDecoration />

      <Header />
      <main className="pt-20">
        <EventDetail event={event} />
      </main>

      {/* Music Player - with birthday mode for birthday events */}
      <MusicPlayer isBirthdayMode={isBirthdayEvent} />
    </>
  );
}
