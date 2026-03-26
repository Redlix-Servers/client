import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete("client_session");
  cookieStore.delete("client_id");
  cookieStore.delete("admin_session");

  // Dynamically resolve the origin from the incoming request to prevent localhost redirects in production
  const origin = new URL(request.url).origin;
  return NextResponse.redirect(new URL("/client/login", origin), {
    status: 303
  });
}
