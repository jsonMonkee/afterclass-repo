import { NextResponse } from 'next/server.js';
import { verifyToken } from '../../../../utils/auth.js';

/**
 * Session Verification Route Handler
 * GET /api/auth/session
 */
export async function GET(request) {
  try {
    let token = null;

    // 1. Check cookies (supports both NextRequest and standard Request headers)
    if (request.cookies?.get) {
      token = request.cookies.get('afterclass_session')?.value;
    } else if (request.headers.get('cookie')) {
      const match = request.headers.get('cookie').match(/afterclass_session=([^;]+)/);
      if (match) token = match[1];
    }

    // 2. Fallback to Authorization Header
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return NextResponse.json({
        authenticated: false,
        user: null
      });
    }

    const sessionData = verifyToken(token);

    if (!sessionData) {
      return NextResponse.json({
        authenticated: false,
        user: null
      });
    }

    return NextResponse.json({
      authenticated: true,
      user: sessionData
    });
  } catch (error) {
    return NextResponse.json(
      { authenticated: false, error: error.message },
      { status: 500 }
    );
  }
}
