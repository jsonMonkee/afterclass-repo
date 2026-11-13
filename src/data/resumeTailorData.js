/**
 * Internal Resume Tailor Product Engine Models
 * Interactive ATS scoring benchmark, sample profiles, and bullet enhancers.
 */

export const resumeTailorRoles = [
  {
    role: 'Full Stack Engineer',
    targetScore: 92,
    keywordsRequired: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'REST API', 'CI/CD'],
    tips: 'Quantify query latency reductions and frontend load-time improvements.'
  },
  {
    role: 'AI / Data Science Engineer',
    targetScore: 89,
    keywordsRequired: ['Python', 'PyTorch', 'HuggingFace', 'Pandas', 'Vector Databases', 'Fine-tuning'],
    tips: 'Highlight model parameter size, evaluation metrics (F1/BLEU), and production deployment.'
  },
  {
    role: 'Product / UI-UX Designer',
    targetScore: 95,
    keywordsRequired: ['Figma', 'Design Systems', 'User Research', 'Wireframing', 'Prototyping', 'Accessibility'],
    tips: 'Mention live user testing sample sizes and conversion rate uplifts.'
  }
];

export const sampleTailoredBullets = {
  raw: 'Worked on a college project website using React and helped club members register for fest.',
  tailored: 'Architected responsive fest registration portal using Next.js & Tailwind CSS, processing 1,400+ concurrent student registrations with zero downtime and sub-200ms API response latency.'
};
