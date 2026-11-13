import { NextResponse } from 'next/server.js';
import { sponsoredBanners, promotionPricing } from '../../../../data/dhandaData.js';

let activeBanners = [...sponsoredBanners];

/**
 * Sponsored Frontpage & Category Banner Promotions API
 * GET /api/dhanda/promotions
 * POST /api/dhanda/promotions (Book ad placement)
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    banners: activeBanners,
    pricingTiers: promotionPricing
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { businessName, owner, tagline, whatsapp, tier, image } = body;

    if (!businessName || !owner || !whatsapp) {
      return NextResponse.json(
        { success: false, error: 'Business name, student owner, and WhatsApp are required.' },
        { status: 400 }
      );
    }

    const newBanner = {
      id: `banner-${Date.now()}`,
      businessName,
      owner,
      tagline: tagline || 'Student-run campus business on Afterclass.',
      badge: 'SPONSORED SPOTLIGHT',
      ctaText: 'Order on WhatsApp',
      whatsapp,
      discountCode: body.discountCode || 'AFTERCLASS',
      image: image || 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
      verifiedStudent: true,
      weeklySlot: tier === 'Category Spotlight' ? 'Category Pinned' : 'Main Homepage & Dhanda Header',
      pricePaid: tier === 'Category Spotlight' ? '₹149/week' : '₹299/week'
    };

    activeBanners.unshift(newBanner);

    return NextResponse.json({
      success: true,
      message: 'Promotion banner approved and scheduled for campus spotlight!',
      data: newBanner
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Promotion booking failed', details: error.message },
      { status: 500 }
    );
  }
}
