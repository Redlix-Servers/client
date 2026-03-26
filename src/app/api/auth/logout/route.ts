import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("client_session");
  cookieStore.delete("client_id");
  cookieStore.delete("admin_session");

  return NextResponse.redirect(new URL("/client/login", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"), {
    status: 303 // Use See Other for safe redirection after a POST request
  });
}
