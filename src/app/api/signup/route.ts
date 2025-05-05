import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { first_name, last_name, company_name, email, password } = await req.json();

  try {
    const res = await fetch(process.env.BACKEND_URL! + "/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ first_name, last_name, company_name, email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: err.message }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
