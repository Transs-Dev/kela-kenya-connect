import { Home, HardHat, Plane, ShoppingCart, Settings, type LucideIcon } from 'lucide-react';

export interface ServiceDef {
  slug: string;
  title: string;
  short: string;
  icon: LucideIcon;
  intro: string;
  benefits: string[];
  steps: { title: string; description: string }[];
  whatsappMessage: string;
}

export const SERVICES: ServiceDef[] = [
  {
    slug: 'property-management',
    title: 'Property Management',
    short: 'Rent collection, maintenance and tenant care while you live abroad.',
    icon: Home,
    intro:
      'We act as your trusted, on-the-ground property manager in Kenya — collecting rent, screening tenants and keeping your investment in top condition so you can focus on life abroad.',
    benefits: [
      'Monthly rent collection and remittance to your account',
      'Tenant screening, lease management and communication',
      'Routine inspections with photo and video reports',
      'Maintenance, repairs and supplier coordination',
      'Legal compliance and documentation handling',
    ],
    steps: [
      { title: 'Discovery call', description: 'We learn about your property, tenants and goals.' },
      { title: 'Onboarding', description: 'We take stock, photograph and document everything.' },
      { title: 'Active management', description: 'We handle rent, repairs and tenants for you.' },
      { title: 'Monthly reporting', description: 'You receive clear statements and updates.' },
    ],
    whatsappMessage: "Hi! I'm interested in your property management services.",
  },
  {
    slug: 'construction-management',
    title: 'Construction Management',
    short: 'End-to-end oversight of your build, from foundation to handover.',
    icon: HardHat,
    intro:
      'Building from abroad is hard. We supervise your project on-site, manage contractors and protect your budget so your dream home becomes reality without the stress.',
    benefits: [
      'Project planning, budgeting and timeline management',
      'Vetted contractor sourcing and supervision',
      'Quality control and regular site inspections',
      'Transparent cost tracking and procurement support',
      'Weekly progress reports with photos and videos',
    ],
    steps: [
      { title: 'Project brief', description: 'We understand your vision, budget and timeline.' },
      { title: 'Planning', description: 'We assemble the team and lock the schedule.' },
      { title: 'On-site supervision', description: 'We oversee daily work and quality.' },
      { title: 'Handover', description: 'You receive a finished, documented project.' },
    ],
    whatsappMessage: 'Hi! I need help managing a construction project in Kenya.',
  },
  {
    slug: 'travel-planning',
    title: 'Travel Planning',
    short: 'Flights, stays and itineraries — planned to feel effortless.',
    icon: Plane,
    intro:
      'Whether you are visiting family or planning a getaway in Kenya, we craft seamless travel experiences with trusted partners and personal attention.',
    benefits: [
      'Flight booking and seat selection',
      'Hotels, lodges and accommodation reservations',
      'Airport transfers and on-the-ground transport',
      'Custom safari and leisure itineraries',
      'Travel insurance and visa guidance',
    ],
    steps: [
      { title: 'Tell us your dates', description: 'Share your travel window and preferences.' },
      { title: 'Custom proposal', description: 'We send a tailored plan and pricing.' },
      { title: 'Booking', description: 'We confirm flights, stays and transfers.' },
      { title: 'On-trip support', description: 'We stay reachable through your journey.' },
    ],
    whatsappMessage: 'Hi! I need help planning my travel to Kenya.',
  },
  {
    slug: 'daily-tasks',
    title: 'Daily Task Assistance',
    short: 'Errands, appointments and documents — handled for you in Kenya.',
    icon: ShoppingCart,
    intro:
      'From paying bills to collecting documents and supporting loved ones, we run the everyday errands that keep your life in Kenya moving.',
    benefits: [
      'Grocery shopping and home delivery',
      'Medical appointments and prescription pickups',
      'Document collection, courier and delivery',
      'Bill payments, banking and government offices',
      'Emergency support for family members',
    ],
    steps: [
      { title: 'Send the task', description: 'Message us what you need done.' },
      { title: 'Quote and confirm', description: 'We share scope and pricing.' },
      { title: 'Execution', description: 'A trained assistant handles it.' },
      { title: 'Proof of completion', description: 'You receive photos and receipts.' },
    ],
    whatsappMessage: 'Hi! I need help with daily tasks and errands in Kenya.',
  },
  {
    slug: 'tailored-solutions',
    title: 'Tailored Solutions',
    short: 'Custom packages built around your unique situation.',
    icon: Settings,
    intro:
      "If your needs don't fit a standard service, we build one with you. Flexible, transparent and designed around your goals and timeline.",
    benefits: [
      'Personalised service packages',
      'Flexible scheduling and engagement models',
      'Custom pricing aligned with your budget',
      'A dedicated point of contact',
      'Priority support availability',
    ],
    steps: [
      { title: 'Consultation', description: 'We listen and clarify your goals.' },
      { title: 'Proposal', description: 'We design a plan made for you.' },
      { title: 'Delivery', description: 'We execute with regular check-ins.' },
      { title: 'Review and refine', description: 'We adjust as your needs evolve.' },
    ],
    whatsappMessage: 'Hi! I need a custom solution tailored to my needs.',
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
