import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { uniqueId } = await request.json();

  if (!uniqueId) {
    return NextResponse.json({ error: "System ID is required" }, { status: 400 });
  }

  try {
    const client = await prisma.user.findUnique({
      where: { uniqueId },
    });

    if (client) {
      const cookieStore = await cookies();
      cookieStore.set("client_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });
      cookieStore.set("client_id", uniqueId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Invalid System ID" }, { status: 401 });
    }
  } catch (error: any) {
    console.error("Auth Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
