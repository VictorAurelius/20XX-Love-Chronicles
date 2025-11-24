import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import EventDetail from '@/components/EventDetail';
import timelineData from '@/data/timeline-data.json';

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

  return (
    <>
      <Header />
      <main className="pt-20">
        <EventDetail event={event} />
      </main>
    </>
  );
}
