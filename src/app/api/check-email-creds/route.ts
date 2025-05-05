// app/api/check-app-creds/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { user_email } = await req.json();

  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/check-email-creds/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email }),
      }
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch creds" }, { status: 500 });
  }
}
