import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { user_email } = await req.json();

    const res = await fetch(`${process.env.BACKEND_URL}/api/get-messages/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_email }),
    });

    if (!res.ok) throw new Error("Failed to fetch responses");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
