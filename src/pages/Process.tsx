import { MessageSquare, Users, CheckCircle, RefreshCw, Star, FileText } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import CTASection from '@/components/CTASection';
import SEO from '@/components/SEO';

const steps = [
  { icon: MessageSquare, title: 'Client Inquiry', desc: "You reach out via WhatsApp, call or our form. This is where your journey with Kela begins." },
  { icon: Users, title: 'Consultation & Agreement', desc: 'We schedule a call to understand your needs, then outline scope, timeline and fees in a clear agreement.' },
  { icon: CheckCircle, title: 'Task Assignment & Execution', desc: 'Our trained team takes over and executes your tasks professionally.' },
  { icon: RefreshCw, title: 'Updates & Communication', desc: "You receive timely updates via WhatsApp, email or your preferred channel." },
  { icon: Star, title: 'Feedback & Adjustments', desc: 'We check in to refine the work and make sure it matches your expectations.' },
  { icon: FileText, title: 'Completion & Reporting', desc: 'We deliver a detailed report with receipts, photos and documentation.' },
];

const Process = () => {
  return (
    <>
      <SEO title="Our Process — Kela Assistance" description="A clear, transparent six-step process from inquiry to handover." />
      <PageHero
        eyebrow="Process"
        title="A simple, transparent process."
        subtitle="From your first message to final handover — here's exactly how we work."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Process' }]}
      />

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#800024] via-[#C17A8E] to-transparent md:-translate-x-1/2" />
            <div className="space-y-12">
              {steps.map((s, i) => {
                const I = s.icon;
                const isRight = i % 2 === 1;
                return (
                  <div key={s.title} className={`relative md:grid md:grid-cols-2 md:gap-12 items-center ${isRight ? 'md:[direction:rtl]' : ''}`}>
                    <div className={`pl-16 md:pl-0 md:[direction:ltr] ${isRight ? 'md:text-right' : ''}`}>
                      <div className="text-xs font-bold uppercase tracking-widest text-[#C17A8E] mb-2">Step {String(i + 1).padStart(2, '0')}</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{s.desc}</p>
                    </div>
                    <div className="hidden md:block" />
                    <div className="absolute left-0 md:left-1/2 top-0 md:-translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#800024] to-[#C17A8E] flex items-center justify-center text-white shadow-lg">
                      <I className="w-5 h-5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Process;
