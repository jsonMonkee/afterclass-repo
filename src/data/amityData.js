export const campusEvents = [
  {
    id: 'ev-1',
    title: 'AmiFIESTA: Eastern India Inter-College Fest',
    category: 'Cultural & Music',
    club: 'Cultural Affairs Council',
    clubId: 'cultural-council',
    date: 'Fri Nov',
    time: '4:00 PM - 10:00 PM',
    venue: 'Main Auditorium & Amphitheatre, Major Arterial Rd',
    status: 'Registration open',
    badge: 'FLAGSHIP',
    attendees: 1240,
    deadline: 'Nov 18, 2026',
    description: 'The annual cultural flagship of Amity University Kolkata. 3 days of battle of bands, fashion showcase, street play, classical dance, and Bollywood DJ night with headline artists.',
    tags: ['Music', 'Dance', 'All Amity', 'Inter-College'],
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Amity Cultural Council',
    verified: true
  },
  {
    id: 'ev-2',
    title: 'HackAmity: Genesis Hackathon',
    category: 'Coding & Tech',
    club: 'Amity Turing Club & GDG on Campus',
    clubId: 'turing-club',
    date: 'Sat Nov',
    time: '9:00 AM IST onwards',
    venue: 'Computer Science Block Lab 402 & Hybrid Discord',
    status: 'Filling fast',
    badge: 'PRIZES ₹1.5L',
    attendees: 380,
    deadline: 'Nov 25, 2026',
    description: 'Build high-impact AI agents, campus tools, and decentralized apps. Mentorship from Silicon Valley and Bangalore engineers. Free pizza, caffeine, and cloud credits for all qualified teams.',
    tags: ['AI/ML', 'Web3', 'Hardware', 'Swag'],
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Amity Turing Club',
    verified: true
  },
  {
    id: 'ev-3',
    title: 'Acoustic Unplugged & Open Mic Evening',
    category: 'Music',
    club: 'Cadence — The Music Society',
    clubId: 'cadence',
    date: 'Wed Nov',
    time: '5:30 PM - 8:00 PM',
    venue: 'Cafeteria Lawn Steps',
    status: 'Upcoming',
    badge: 'FREE ENTRY',
    attendees: 215,
    deadline: 'Nov 17, 2026',
    description: 'Bring your guitars, cajóns, original poetry, and soulful vocals under the twilight campus sky. Coffee vouchers for all performers.',
    tags: ['Acoustic', 'Vocal', 'Campus Vibe'],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Cadence Club',
    verified: true
  },
  {
    id: 'ev-4',
    title: 'VentureSprint: Pitch Your Startup to Angel Alumni',
    category: 'Entrepreneurship',
    club: 'E-Cell Amity Kolkata (E-Cell Ekatvam)',
    clubId: 'e-cell',
    date: 'Thu Dec',
    time: '2:30 PM - 6:00 PM',
    venue: 'Seminar Hall B, Block A',
    status: 'Registration open',
    badge: 'INCUBATION',
    attendees: 160,
    deadline: 'Nov 30, 2026',
    description: 'Present your early-stage venture or side project before founders who graduated from Amity Kolkata and are now backed by top VCs.',
    tags: ['Startups', 'Pitch', 'Funding', 'Mentorship'],
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
    organizer: 'Ekatvam E-Cell',
    verified: true
  }
];

export const campusClubs = [
  {
    id: 'turing-club',
    name: 'Turing Tech & Code Club',
    tagline: 'Code, build, ship, repeat. Developers of Amity.',
    category: 'Coding and technology',
    membersCount: 640,
    lead: 'Debjit Mukherjee (B.Tech CSE 2027)',
    verified: true,
    avatar: '💻',
    activeEvents: 3,
    color: '#3B3BFF',
    openRoles: 'Frontend Dev, Core Event Organizer, UI/UX Lead',
    tags: ['Next.js', 'Python', 'AI Hackathons', 'Open Source'],
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=1000&fit=crop&q=80',
    instagram: '@turing_amitykol',
    description: 'Home for engineers, hackers, designers, and open-source contributors at Amity University Kolkata. We build campus tools, host hackathons, and mentor juniors.'
  },
  {
    id: 'cadence',
    name: 'Cadence — Music Society',
    tagline: 'Rhythms of Action, melodies of Kolkata.',
    category: 'Music',
    membersCount: 412,
    lead: 'Srijita Roy (B.Sc Psych 2026)',
    verified: true,
    avatar: '🎸',
    activeEvents: 2,
    color: '#1A1A8C',
    openRoles: 'Bassist, Drummer, Sound & Console Tech',
    tags: ['Acoustic', 'Battle of Bands', 'Choir', 'Live Sound'],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=1000&fit=crop&q=80',
    instagram: '@cadence_amity',
    description: 'The official music band & choir of Amity Kolkata. Winners of multiple state-level inter-college battle of bands.'
  },
  {
    id: 'e-cell',
    name: 'E-Cell Ekatvam',
    tagline: 'Igniting entrepreneurial fire across Action Area II.',
    category: 'Entrepreneurship',
    membersCount: 520,
    lead: 'Aryan Bose (BBA 2026)',
    verified: true,
    avatar: '🚀',
    activeEvents: 1,
    color: '#000000',
    openRoles: 'Corporate Relations, Sponsorship Head, Content Writer',
    tags: ['Startups', 'Pitch Deck', 'Venture Capital', 'Networking'],
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=1000&fit=crop&q=80',
    instagram: '@ecell_amitykolkata',
    description: 'Fostering innovation, student ventures, incubation support, and founder masterclasses with alumni networks.'
  },
  {
    id: 'dramatics',
    name: 'NatyaRang — Dramatics Society',
    tagline: 'Street plays, stage drama, and raw campus truth.',
    category: 'Dance and performing arts',
    membersCount: 290,
    lead: 'Rishi Sen (BA J&MC 2027)',
    verified: true,
    avatar: '🎭',
    activeEvents: 2,
    color: '#3B3BFF',
    openRoles: 'Scriptwriter, Stage Actor, Props Coordinator',
    tags: ['Street Plays', 'Mime', 'Stage Drama', 'Scriptwriting'],
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=1000&fit=crop&q=80',
    instagram: '@natyarang_auk',
    description: 'Street nukkad natak, mime, theatre productions, and annual inter-university drama competitions.'
  },
  {
    id: 'lenscrafters',
    name: 'Aperture — Media & Photography',
    tagline: 'Capturing every light, smile, and moment at Amity.',
    category: 'Photography and media',
    membersCount: 310,
    lead: 'Ananya Guha (B.Des 2026)',
    verified: true,
    avatar: '📸',
    activeEvents: 1,
    color: '#1A1A8C',
    openRoles: 'Videographer, Colorist, Drone Pilot',
    tags: ['Cinematography', 'Portraits', 'Fest Coverage', 'Editing'],
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=1000&fit=crop&q=80',
    instagram: '@aperture_auk',
    description: 'The visual chroniclers of Amity University Kolkata. Responsible for official fest coverage, portraits, and short films.'
  },
  {
    id: 'rotaract',
    name: 'Rotaract Club of Amity Kolkata',
    tagline: 'Service above self, impact within Newtown & beyond.',
    category: 'Social impact and volunteering',
    membersCount: 480,
    lead: 'Tanmay Das (Law 2026)',
    verified: true,
    avatar: '🌱',
    activeEvents: 2,
    color: '#3B3BFF',
    openRoles: 'Community Outreach Lead, Blood Drive Coordinator',
    tags: ['Social Impact', 'Green Campus', 'Blood Drives', 'Community'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1000&fit=crop&q=80',
    instagram: '@rotaract_auk',
    description: 'Dedicated to impactful social campaigns, green campus initiatives, book drives, and blood donation camps.'
  }
];

export const opportunities = [
  {
    id: 'op-1',
    title: 'Campus Ambassador & Lead Organizer — TEDxAmityKolkata 2027',
    source: 'Official TEDx Licensee Board',
    category: 'Campus ambassador roles',
    type: 'Leadership & Certificate',
    deadline: 'Nov 22, 2026',
    verified: true,
    stipend: 'Certificate + Letter of Recommendation + All-Access Pass',
    eligibility: 'All years (UG/PG)',
    description: 'Represent TEDx across departments, organize speaker curation sessions, and coordinate production logistics.'
  },
  {
    id: 'op-2',
    title: 'Frontend React/Tailwind Intern (Campus Tech Stack)',
    source: 'Afterclass Core Team / Amity Incubation Center',
    category: 'Internships',
    type: '3-Month Paid Internship',
    deadline: 'Nov 29, 2026',
    verified: true,
    stipend: '₹8,000 / month + Mentorship',
    eligibility: 'CSE, IT, BCA, MCA students',
    description: 'Work directly on the production Afterclass web application, building student features, real-time event check-ins, and club leader consoles.'
  },
  {
    id: 'op-3',
    title: 'Auditions: Lead Vocalists & Electric Bassists',
    source: 'Cadence Music Society',
    category: 'Auditions',
    type: 'Club Recruitment',
    deadline: 'Nov 19, 2026',
    verified: true,
    stipend: 'Performance Honorarium for Inter-state Fests',
    eligibility: 'Open to all enrolled Amity Kolkata students',
    description: 'Prepare 1 English or Hindi acoustic piece (2 minutes). Stage trial followed by impromptu jamming round.'
  },
  {
    id: 'op-4',
    title: 'Smart Bengal Hackathon 2026 Team Selection',
    source: 'Department of Computer Science & Engineering',
    category: 'Competitions and hackathons',
    type: 'State-level Hackathon',
    deadline: 'Dec 05, 2026',
    verified: true,
    stipend: 'College-sponsored travel & stay for finals',
    eligibility: 'Teams of 4 (Minimum 1 female candidate mandatory)',
    description: 'Solve real civic and sustainability problems for West Bengal municipalities. Top teams represent Amity Kolkata.'
  }
];

export const notices = [
  {
    id: 'not-1',
    title: 'Odd Semester End-Term Examination Schedule & Admit Card Advisory',
    source: 'Office of the Controller of Examinations',
    badge: 'OFFICIAL UNIVERSITY',
    date: 'Nov 11, 2026',
    pinned: true,
    priority: 'high',
    content: 'Students are advised to clear outstanding semester dues on Amizone to download hall tickets. Examination commencement date confirmed from December 14, 2026.'
  },
  {
    id: 'not-2',
    title: 'Guidelines for Inter-College Fest Security & Shuttle Buses',
    source: 'Dean of Student Welfare (DSW)',
    badge: 'OFFICIAL UNIVERSITY',
    date: 'Nov 09, 2026',
    pinned: true,
    priority: 'medium',
    content: 'Special AC shuttle buses will ply between Amity University Kolkata Newtown campus and Ultadanga / Karunamoyee metro stations during fest evenings until 10:30 PM.'
  },
  {
    id: 'not-3',
    title: 'Classroom Booking Window for Club Practices (Winter Fest Prep)',
    source: 'Campus Administration Desk',
    badge: 'ADMINISTRATIVE',
    date: 'Nov 08, 2026',
    pinned: false,
    priority: 'normal',
    content: 'Verified club leaders can book Block B rehearsal rooms between 4:30 PM - 7:30 PM using their Afterclass Club ID credentials.'
  }
];

export const testimonials = [
  {
    quote: "“Before Afterclass, nobody knew when auditions happened unless you were in the right WhatsApp group with 1,000 muted notifications. Now 400+ people showed up to our jam session.”",
    author: "SRIJITA ROY",
    role: "PRESIDENT, CADENCE MUSIC SOCIETY",
    dept: "PSYCHOLOGY '26",
    handle: "@srijita_cadence"
  },
  {
    quote: "“The electric simplicity reminds me of Arc browser itself. Everything feels instant, tactile, and strictly about campus culture without the bureaucratic noise of old university portals.”",
    author: "DEBJIT MUKHERJEE",
    role: "HEAD OF TECH, TURING CLUB",
    dept: "B.TECH CSE '27",
    handle: "@debjit_codes"
  },
  {
    quote: "“We filled our hackathon registration cap in 48 hours. The verified badges mean students actually trust our event dates and don't suspect spam.”",
    author: "ARYAN BOSE",
    role: "FOUNDER, EKATVAM E-CELL",
    dept: "BBA '26",
    handle: "@aryan_ekatvam"
  },
  {
    quote: "“It brings the actual soul of Amity Kolkata to life. You walk into campus knowing exactly which lawn has an open mic and where the robotics lab is buzzing tonight.”",
    author: "ANANYA GUHA",
    role: "LEAD CURATOR, APERTURE MEDIA",
    dept: "B.DES '26",
    handle: "@ananya_lens"
  }
];

