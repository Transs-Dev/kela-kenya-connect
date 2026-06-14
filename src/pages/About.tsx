import { Heart, Globe, Users, Award, Target, Eye, ShieldCheck } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import CTASection from '@/components/CTASection';
import SEO from '@/components/SEO';

const values = [
  { icon: ShieldCheck, title: 'Trust', text: 'Every assignment is handled by vetted, accountable people.' },
  { icon: Heart, title: 'Care', text: 'We treat your family, property and time as our own.' },
  { icon: Eye, title: 'Transparency', text: 'Clear scopes, fair pricing, honest reporting, always.' },
  { icon: Award, title: 'Reliability', text: 'When we commit, we deliver. On time. Every time.' },
];

const points = [
  { icon: Heart, title: 'Born from Personal Experience', text: 'Founded by Kenyans who lived the diaspora struggle firsthand.' },
  { icon: Globe, title: 'Global Reach, Local Expertise', text: 'Serving the US, Canada, UK, UAE, Australia, Norway and Germany with deep, on-the-ground Kenyan knowledge.' },
  { icon: Users, title: 'Trusted Network', text: 'Verified partners and professionals across the country.' },
  { icon: Award, title: 'Proven Track Record', text: 'Hundreds of successful engagements and counting.' },
];

const About = () => {
  return (
    <>
      <SEO title="Our Story | Kela Link Ltd" description="How Kela Link Ltd was born from real diaspora challenges, our mission, vision and values." />
      <PageHero
        eyebrow="Our Story"
        title="Born from the Diaspora, Built for the Diaspora."
        subtitle="Kela Link Ltd exists because we lived the problem of managing life back home from thousands of miles away."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Our Story' }]}
      />

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6 text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
            <p>
              Kela Link Ltd was born from a simple yet profound understanding: Kenyans
              living abroad shouldn't have to worry about managing their affairs back home. Our
              founders, themselves part of the Kenyan diaspora, felt the daily anxiety of being
              thousands of miles away while needing to handle property, family and business in
              Kenya.
            </p>
            <p>
              What started as friends helping friends has grown into a comprehensive assistance
              service that bridges the gap between distance and care. We've built a network of
              trusted professionals and dedicated staff who share our commitment to excellence and
              integrity. Every service we deliver preserves a connection, maintains a legacy, and
              gives our clients peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6 max-w-5xl">
          <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <Target className="w-8 h-8 text-[#800024] mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To simplify life across borders for Kenyans abroad by being the trusted partner who
              shows up, on the ground, with care and excellence.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <Eye className="w-8 h-8 text-[#800024] mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              A connected diaspora that never feels far from home, empowered with reliable
              services that make managing life in Kenya effortless.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Our Values</h2>
            <p className="text-gray-600 dark:text-gray-300">The principles that guide every assignment we take on.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((v) => {
              const I = v.icon;
              return (
                <div key={v.title} className="p-7 rounded-2xl bg-gradient-to-br from-pink-50 to-white dark:from-gray-800 dark:to-gray-800 border border-pink-100 dark:border-gray-700">
                  <I className="w-7 h-7 text-[#800024] mb-4" />
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Points */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {points.map((p) => {
              const I = p.icon;
              return (
                <div key={p.title} className="flex gap-4 p-6 rounded-2xl bg-white dark:bg-gray-800">
                  <div className="w-12 h-12 rounded-xl bg-[#800024]/10 flex items-center justify-center shrink-0">
                    <I className="w-6 h-6 text-[#800024]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{p.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{p.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection title="Let's bridge the distance together" subtitle="Tell us what you need handled back home." />
    </>
  );
};

export default About;
