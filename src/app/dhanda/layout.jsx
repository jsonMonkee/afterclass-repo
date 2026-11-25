export const metadata = {
  title: 'Flats in Kolkata, PG & Student Ventures Near Amity | Afterclass Dhanda',
  description:
    'Find flats in Kolkata, PG rooms, hostels, and student rentals in New Town, Rajarhat, Action Area II & Salt Lake near Amity University Kolkata, alongside campus startups.',
  keywords: [
    'flats in Kolkata',
    'flats for rent in Kolkata',
    'student flats in New Town Kolkata',
    'PG near Amity University Kolkata',
    'hostels in Rajarhat Kolkata',
    'rental flats in Action Area II New Town',
    'student accommodation Kolkata',
    'flatmates in New Town Kolkata',
    'Amity Kolkata Dhanda',
  ],
  openGraph: {
    title: 'Flats in Kolkata, PG & Student Ventures Near Amity | Afterclass Dhanda',
    description:
      'Flats for rent in Kolkata (New Town, Rajarhat, Action Area II), student PGs, hostels, and Amity Kolkata campus ventures.',
    type: 'website',
  },
};

export default function DhandaLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Flats in Kolkata, Student Hostels, PG & Ventures — Afterclass Dhanda',
    description:
      'Discover flats in Kolkata, rental apartments, PG accommodations, hostels, and student-run ventures in New Town, Action Area II, Rajarhat, and Salt Lake near Amity University Kolkata.',
    areaServed: [
      { '@type': 'City', name: 'Kolkata' },
      { '@type': 'Place', name: 'New Town, Rajarhat, Kolkata' },
      { '@type': 'Place', name: 'Action Area II, New Town, Kolkata' },
      { '@type': 'Place', name: 'Salt Lake, Kolkata' },
    ],
    about: [
      { '@type': 'Thing', name: 'Flats in Kolkata' },
      { '@type': 'Thing', name: 'Flats for Rent in New Town Kolkata' },
      { '@type': 'Thing', name: 'PG and Hostel Accommodation in Kolkata' },
      { '@type': 'Thing', name: 'Student Housing Near Amity University Kolkata' },
      { '@type': 'Thing', name: 'Student Startups at Amity University Kolkata' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
