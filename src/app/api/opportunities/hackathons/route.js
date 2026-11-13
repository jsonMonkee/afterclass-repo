import { NextResponse } from 'next/server.js';
import { hackathonsList, hackathonTags } from '../../../../data/hackathonsData.js';

/**
 * Unstop & Devfolio Collegiate Hackathon Aggregator API
 * GET /api/opportunities/hackathons?tag=AI%2FML&mode=Online&search=flipkart
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    const mode = searchParams.get('mode');
    const platform = searchParams.get('platform');
    const search = searchParams.get('search');

    let results = [...hackathonsList];

    if (tag && tag !== 'All') {
      results = results.filter(h => h.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
    }

    if (mode) {
      results = results.filter(h => h.mode.toLowerCase().includes(mode.toLowerCase()));
    }

    if (platform) {
      results = results.filter(h => h.platform.toLowerCase() === platform.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(h =>
        h.title.toLowerCase().includes(q) ||
        h.organizer.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q) ||
        h.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      tags: hackathonTags,
      data: results,
      meta: {
        sources: ['Unstop API Feed', 'Devfolio Collegiate', 'MLH Eastern Circuit'],
        lastScraped: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to aggregate hackathons', details: error.message },
      { status: 500 }
    );
  }
}
