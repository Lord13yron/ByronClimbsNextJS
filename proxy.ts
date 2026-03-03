import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "./lib/supabase/supabaseServer";
import { updateSession } from "./lib/supabase/middleware";

// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function proxy(request: NextRequest) {
  // Always update the session first
  const response = await updateSession(request);

  // Check if the path is for the admin route
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Create Supabase client with the updated request/response
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If not authenticated, redirect to login
    if (!user) {
      return NextResponse.redirect(new URL("/account/signin", request.url));
    }
    // Check if user is admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  if (
    request.nextUrl.pathname.startsWith("/account") &&
    !request.nextUrl.pathname.startsWith("/account/signin") &&
    !request.nextUrl.pathname.startsWith("/account/signup") &&
    !request.nextUrl.pathname.startsWith("/account/confirm")
  ) {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If not authenticated, redirect to login
    if (!user) {
      return NextResponse.redirect(new URL("/account/signin", request.url));
    }
  }

  // For all other routes, or if admin checks pass, return the response
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
