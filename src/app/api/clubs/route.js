import { NextResponse } from 'next/server.js';
import { campusClubs } from '../../../data/amityData.js';
import { verifyToken } from '../../../utils/auth.js';

let dynamicClubs = [...campusClubs];

/**
 * Clubs Management API
 * GET /api/clubs
 * PATCH /api/clubs (Club Leads & Superadmins update recruitment/bio)
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    count: dynamicClubs.length,
    data: dynamicClubs
  });
}

export async function PATCH(request) {
  try {
    // Authenticate caller via Cookie or Authorization Bearer token
    let token = null;
    if (request.cookies?.get) {
      token = request.cookies.get('afterclass_session')?.value;
    } else if (request.headers.get('cookie')) {
      const match = request.headers.get('cookie').match(/afterclass_session=([^;]+)/);
      if (match) token = match[1];
    }

    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please sign in as a club lead or superadmin.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { clubId, openRoles, recruitmentStatus, description, tagline } = body;

    if (!clubId) {
      return NextResponse.json(
        { success: false, error: 'Target clubId is required.' },
        { status: 400 }
      );
    }

    // RBAC: Verify if user owns this club or is superadmin
    if (user.role !== 'superadmin' && user.clubId !== clubId) {
      return NextResponse.json(
        { success: false, error: `Forbidden: You only have permission to manage ${user.clubName || user.clubId}.` },
        { status: 403 }
      );
    }

    const clubIndex = dynamicClubs.findIndex(c => c.id === clubId);
    if (clubIndex === -1) {
      return NextResponse.json(
        { success: false, error: `Club ${clubId} not found.` },
        { status: 404 }
      );
    }

    dynamicClubs[clubIndex] = {
      ...dynamicClubs[clubIndex],
      ...(openRoles && { openRoles }),
      ...(recruitmentStatus && { recruitmentStatus }),
      ...(description && { description }),
      ...(tagline && { tagline }),
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: `Club ${dynamicClubs[clubIndex].name} updated successfully.`,
      data: dynamicClubs[clubIndex]
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Club update failed', details: error.message },
      { status: 500 }
    );
  }
}
