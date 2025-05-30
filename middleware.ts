import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Allow all requests to pass through without authentication checks
  return NextResponse.next()
}

// Keep the matcher configuration
export const config = {
  matcher: ["/", "/login", "/register", "/profile/:path*"],
}

