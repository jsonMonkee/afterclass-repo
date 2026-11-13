/**
 * Multi-Campus Configuration Registry for Afterclass
 * Supports subdomain tenancies (e.g. auk.afterclass.com, delhi.afterclass.com)
 */

export const campuses = {
  auk: {
    id: 'auk',
    name: 'Amity University Kolkata',
    shortName: 'Amity Kolkata',
    subdomain: 'auk',
    domain: 'auk.afterclass.com',
    location: 'Major Arterial Road, Action Area II, Newtown, Kolkata, WB 700135',
    tagline: 'Beyond the Classroom in Major Arterial Road',
    studentCount: '7,500+',
    primaryColor: '#E11D48',
    darkAccent: '#881337',
    creamBg: '#FFFDF5',
    badge: 'FLAGSHIP CAMPUS',
    communities: {
      whatsapp: 'https://chat.whatsapp.com/afterclass-auk-official',
      telegram: 'https://t.me/afterclass_auk',
      discord: 'https://discord.gg/afterclass-auk'
    },
    canteenGuide: [
      { name: 'Ground Floor Central Mess', timing: '8:30 AM - 7:30 PM', tip: 'Best masala dosa & cold coffee under ₹50.' },
      { name: 'Amiphoria Coffee Kiosk', timing: '9:00 AM - 6:00 PM', tip: 'Lifesaver before 9:15 AM attendance cut-off.' },
      { name: 'Kadambagachhi Tapri (Outside Gate 2)', timing: '7:00 AM - 9:00 PM', tip: 'Maggie, sutta, and chai debates.' }
    ]
  },
  delhi: {
    id: 'delhi',
    name: 'Amity University Noida / Delhi NCR',
    shortName: 'Amity Noida',
    subdomain: 'delhi',
    domain: 'delhi.afterclass.com',
    location: 'Sector 125, Noida, Uttar Pradesh 201313',
    tagline: 'Beyond the Classroom at H-Block & E-Block',
    studentCount: '35,000+',
    primaryColor: '#E11D48',
    darkAccent: '#881337',
    creamBg: '#FFFDF5',
    badge: 'NCR CHAPTER',
    communities: {
      whatsapp: 'https://chat.whatsapp.com/afterclass-noida-official',
      telegram: 'https://t.me/afterclass_noida',
      discord: 'https://discord.gg/afterclass-noida'
    },
    canteenGuide: [
      { name: 'H-Block Subways & Dominoes', timing: '10:00 AM - 8:00 PM', tip: 'Default campus hangout hub.' },
      { name: 'CCD Gate 4', timing: '9:00 AM - 7:00 PM', tip: 'Air-conditioned bunk sanctuary.' }
    ]
  },
  jnu: {
    id: 'jnu',
    name: 'Jawaharlal Nehru University',
    shortName: 'JNU New Delhi',
    subdomain: 'jnu',
    domain: 'jnu.afterclass.com',
    location: 'New Mehrauli Road, JNU, New Delhi 110067',
    tagline: 'The Commons & Intellectual Forum Beyond the Lecture Hall',
    studentCount: '9,000+',
    primaryColor: '#B91C1C',
    darkAccent: '#7F1D1D',
    creamBg: '#FFFDF5',
    badge: 'EXPANSION PILOT',
    communities: {
      whatsapp: 'https://chat.whatsapp.com/afterclass-jnu',
      telegram: 'https://t.me/afterclass_jnu',
      discord: 'https://discord.gg/afterclass-jnu'
    },
    canteenGuide: [
      { name: 'Ganga Dhaba', timing: '4:00 PM - 3:00 AM', tip: 'Post-midnight discussions and parathas.' }
    ]
  }
};

export const DEFAULT_CAMPUS_ID = 'auk';

export function getCampusConfig(campusId = DEFAULT_CAMPUS_ID) {
  return campuses[campusId] || campuses[DEFAULT_CAMPUS_ID];
}
