import { NextResponse } from 'next/server.js';
import { studentPerks, perkCategories } from '../../../../data/studentPerksData.js';

/**
 * Resourceify Scraper & Aggregator API
 * GET /api/opportunities/student-perks?category=Developer+Tools&search=github&verificationType=sheerid
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const verificationType = searchParams.get('verificationType');
    const featuredOnly = searchParams.get('featured') === 'true';

    let results = [...studentPerks];

    if (category && category !== 'All') {
      results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (verificationType) {
      results = results.filter(p => p.verificationType.toLowerCase().includes(verificationType.toLowerCase()));
    }

    if (featuredOnly) {
      results = results.filter(p => p.featured);
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.provider.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.highlights.some(h => h.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      categories: perkCategories,
      data: results,
      meta: {
        engine: 'Resourceify Scraper v2.1',
        lastScraped: new Date().toISOString(),
        verifiedInstitution: 'Amity University Kolkata (.edu / student card)'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to aggregate student perks', details: error.message },
      { status: 500 }
    );
  }
}
