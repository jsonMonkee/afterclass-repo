/**
 * Afterclass Dhanda — Campus Student Freelance & Commerce Marketplace Database
 * Designed to solve the disintermediation dilemma via sponsored visibility & Escrow Shield.
 */

export const dhandaCategories = [
  'All',
  'Assignments & Notes',
  'Tech & Code',
  'Design & Creative',
  'Bakes & Treats',
  'Photography & Media',
  'Campus Services'
];

export const sponsoredBanners = [
  {
    id: 'banner-1',
    businessName: 'The Crumb Theory — Artisanal Campus Bakery',
    owner: 'Ananya S. (Biotech 3rd Year)',
    tagline: 'Fresh brownies, bento cakes, and birthday hampers delivered to hostel gate in 30 mins.',
    badge: 'SPONSORED SPOTLIGHT',
    ctaText: 'Order on WhatsApp',
    whatsapp: '919830012345',
    discountCode: 'AFTERCLASS10 (10% Off)',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
    verifiedStudent: true,
    weeklySlot: 'Slot 1: Main Homepage & Dhanda Header',
    pricePaid: '₹299/week'
  },
  {
    id: 'banner-2',
    businessName: 'Kolkata Campus Lens — Convocation & Fest Shoots',
    owner: 'Rohan M. (Mass Comm 4th Year)',
    tagline: 'Sony A7IV 4K portraits, reels, and society team headshots. Instant color-graded RAWs.',
    badge: 'SPONSORED SPOTLIGHT',
    ctaText: 'Book Slot',
    whatsapp: '919830067890',
    discountCode: 'AMITYFEST (Free Reel with Shoot)',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    verifiedStudent: true,
    weeklySlot: 'Slot 2: Media & Services Banner',
    pricePaid: '₹299/week'
  }
];

export const dhandaListings = [
  {
    id: 'dh-1',
    title: 'LaTeX Assignment Typesetting & Handwritten Lab Files',
    seller: 'Vikramaditya R.',
    semester: 'CSE 3rd Year',
    category: 'Assignments & Notes',
    price: 350,
    priceUnit: 'per 10 pages',
    turnaround: 'Within 24 Hours',
    rating: 4.9,
    reviewsCount: 38,
    badge: 'TOP RATED',
    description: 'Neat handwriting, accurate circuit diagrams, flowcharts, and LaTeX formatted reports guaranteed to clear professor formatting inspections.',
    tags: ['LaTeX', 'Lab Manuals', 'Handwritten', 'Fast Turnaround'],
    verifiedAmityEmail: true,
    escrowShield: true,
    contactNumber: '919830011111',
    completedOrders: 64
  },
  {
    id: 'dh-2',
    title: 'Semester 1-6 Handwritten Notes & PYQ Solved Packs',
    seller: 'Sneha P. & Turing Toppers Collective',
    semester: 'B.Tech IT 4th Year',
    category: 'Assignments & Notes',
    price: 199,
    priceUnit: 'per subject pack (PDF)',
    turnaround: 'Instant Digital Download',
    rating: 5.0,
    reviewsCount: 112,
    badge: 'INSTANT DOWNLOAD',
    description: 'Crisp revision cheat sheets, solved 5-year previous exam questions with teacher hints. Saved over 300+ students from semester backlogs.',
    tags: ['PYQ Solutions', 'Exam Cheat Sheet', 'Instant PDF', 'High Score'],
    verifiedAmityEmail: true,
    escrowShield: true,
    instantDigitalDownload: true,
    contactNumber: '919830022222',
    completedOrders: 184
  },
  {
    id: 'dh-3',
    title: 'Custom Bento Cakes & Fudgy Brownie Boxes',
    seller: 'Ananya S.',
    semester: 'B.Sc Biotech 3rd Year',
    category: 'Bakes & Treats',
    price: 450,
    priceUnit: 'per custom cake',
    turnaround: 'Same day (Order by 12 PM)',
    rating: 4.9,
    reviewsCount: 47,
    badge: 'CAMPUS FAVORITE',
    description: '100% eggless gourmet cakes, Nutella sea salt brownies, and midnight birthday surprise deliveries right to Amity Main Gate or Newtown flats.',
    tags: ['Eggless', 'Birthday Cakes', 'Midnight Delivery', 'Brownies'],
    verifiedAmityEmail: true,
    escrowShield: true,
    contactNumber: '919830012345',
    completedOrders: 78
  },
  {
    id: 'dh-4',
    title: 'Full Stack Web App & AI Project MVP Development',
    seller: 'Arjun Sen',
    semester: 'CSE 4th Year (Ex-Google Summer of Code)',
    category: 'Tech & Code',
    price: 3500,
    priceUnit: 'per project milestone',
    turnaround: '3 - 5 Days',
    rating: 5.0,
    reviewsCount: 19,
    badge: 'PRO DEV',
    description: 'Production-ready Next.js / Python Flask / FastAPI project builds for minor/major capstone submissions with complete documentation, PPT, and viva preparation.',
    tags: ['Capstone Project', 'Next.js', 'Python', 'Viva Prep'],
    verifiedAmityEmail: true,
    escrowShield: true,
    contactNumber: '919830033333',
    completedOrders: 28
  },
  {
    id: 'dh-5',
    title: 'Club Fest Poster, Pitch Deck & Branding Graphics',
    seller: 'Priya K.',
    semester: 'Design & Visual Arts 2nd Year',
    category: 'Design & Creative',
    price: 600,
    priceUnit: 'per poster / slide deck',
    turnaround: '12 - 24 Hours',
    rating: 4.8,
    reviewsCount: 26,
    badge: 'CREATIVE PRO',
    description: 'Eye-catching Instagram story cards, high-res print posters, sponsorship brochures, and motion posters that get actual event turnout.',
    tags: ['Poster Design', 'Canva Pro', 'Figma', 'Fest Branding'],
    verifiedAmityEmail: true,
    escrowShield: true,
    contactNumber: '919830044444',
    completedOrders: 41
  },
  {
    id: 'dh-6',
    title: 'Convocation, Fest & Group Portrait Photography',
    seller: 'Rohan M.',
    semester: 'Amity School of Comm 4th Year',
    category: 'Photography & Media',
    price: 800,
    priceUnit: 'per 45-min shoot',
    turnaround: '24 Hours for Edited Photos',
    rating: 4.9,
    reviewsCount: 33,
    badge: '4K GEAR',
    description: 'Professional portrait photography with full lighting kit. Perfect for LinkedIn profile pictures, society cabinet handovers, and convocation memories.',
    tags: ['LinkedIn Headshots', 'Convocation', 'Sony 4K', 'Retouching'],
    verifiedAmityEmail: true,
    escrowShield: true,
    contactNumber: '919830067890',
    completedOrders: 52
  }
];

export const promotionPricing = [
  {
    tier: 'Homepage Main Banner',
    price: '₹299',
    period: 'per week',
    impressions: '12,000+ Campus Views',
    badge: 'HIGHEST CONVERSION',
    features: [
      'Top placement on Afterclass homepage',
      'Pinned spotlight banner on /dhanda',
      'Direct 1-tap WhatsApp lead button',
      'Verified Student Gold Badge',
      'Mention in weekly Telegram circular'
    ]
  },
  {
    tier: 'Category Spotlight',
    price: '₹149',
    period: 'per week',
    impressions: '4,500+ Targeted Views',
    badge: 'BUDGET FRIENDLY',
    features: [
      'Pinned #1 spot in your category',
      'Highlighted glow card border',
      'Direct order button',
      'Afterclass Escrow Shield protection'
    ]
  }
];
