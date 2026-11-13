import { NextResponse } from 'next/server.js';
import { dhandaListings, dhandaCategories } from '../../../data/dhandaData.js';

// In-memory runtime storage for demo/session persistence
let dynamicListings = [...dhandaListings];

/**
 * Afterclass Dhanda (Student Marketplace) API
 * GET /api/dhanda?category=Tech+%26+Code&search=nextjs
 * POST /api/dhanda (Create new student listing)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const escrowOnly = searchParams.get('escrowOnly') === 'true';

    let results = [...dynamicListings];

    if (category && category !== 'All') {
      results = results.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }

    if (escrowOnly) {
      results = results.filter(item => item.escrowShield);
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.seller.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      categories: dhandaCategories,
      data: results
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dhanda listings', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, seller, category, price, turnaround, description, contactNumber, tags } = body;

    if (!title || !seller || !category || !price) {
      return NextResponse.json(
        { success: false, error: 'Missing mandatory fields (title, seller, category, price)' },
        { status: 400 }
      );
    }

    const newListing = {
      id: `dh-${Date.now()}`,
      title,
      seller,
      semester: body.semester || 'Amity Student',
      category,
      price: Number(price),
      priceUnit: body.priceUnit || 'per assignment/service',
      turnaround: turnaround || '24-48 Hours',
      rating: 5.0,
      reviewsCount: 1,
      badge: 'NEW LAUNCH',
      description: description || 'Student service verified by Afterclass.',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : [category]),
      verifiedAmityEmail: true,
      escrowShield: body.escrowShield !== false,
      contactNumber: contactNumber || '919830000000',
      completedOrders: 0
    };

    dynamicListings.unshift(newListing);

    return NextResponse.json({
      success: true,
      message: 'Dhanda listing published successfully under Afterclass Shield!',
      data: newListing
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create dhanda listing', details: error.message },
      { status: 500 }
    );
  }
}
