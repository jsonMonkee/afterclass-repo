import { NextResponse } from 'next/server.js';

/**
 * Logout Route Handler
 * POST /api/auth/logout
 */
export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Signed out successfully.'
  });

  response.cookies.delete('afterclass_session');
  return response;
}
