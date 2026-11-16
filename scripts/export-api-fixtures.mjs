import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dhandaCategories, dhandaListings, sponsoredBanners, promotionPricing } from '../frontend/src/data/dhandaData.js';
import { hackathonsList, hackathonTags } from '../frontend/src/data/hackathonsData.js';
import { studentPerks, perkCategories } from '../frontend/src/data/studentPerksData.js';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const target = resolve(root, 'backend/app/modules');
await mkdir(`${target}/dhanda/data`, { recursive: true });
await mkdir(`${target}/opportunities/data`, { recursive: true });

const outputs = [
  [`${target}/dhanda/data/fixtures.json`, { categories: dhandaCategories, listings: dhandaListings, banners: sponsoredBanners, pricing: promotionPricing }],
  [`${target}/opportunities/data/hackathons.json`, { items: hackathonsList, tags: hackathonTags }],
  [`${target}/opportunities/data/student_perks.json`, { items: studentPerks, categories: perkCategories }],
];

for (const [path, value] of outputs) {
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}
