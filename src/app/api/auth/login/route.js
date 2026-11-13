import { NextResponse } from 'next/server.js';
import { authenticate } from '../../../../utils/auth.js';

/**
 * Authentication Route Handler
 * POST /api/auth/login
 * Body: { username, password }
 */
export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    const authResult = authenticate(username, password);

    if (!authResult) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials. Check your username or password.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: `Welcome back, ${authResult.user.name}!`,
      user: authResult.user,
      token: authResult.token
    });

    // Set secure HTTP-only session cookie
    response.cookies.set({
      name: 'afterclass_session',
      value: authResult.token,
      httpOnly: true,
      path: '/',
      maxAge: 24 * 60 * 60, // 24 hours
      sameSite: 'lax'
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Login service failed', details: error.message },
      { status: 500 }
    );
  }
}
