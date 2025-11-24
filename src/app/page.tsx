import Header from '@/components/Header';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* Timeline section - will be implemented next */}
        <section id="timeline" className="min-h-screen bg-romantic-warmWhite py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-heading font-bold text-gradient-romantic mb-4">
                Our Timeline
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every moment with you is a memory worth keeping 💕
              </p>
            </div>

            {/* Placeholder for Timeline component */}
            <div className="text-center text-gray-500 py-20">
              <p className="text-xl">✨ Timeline component coming next... ✨</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
