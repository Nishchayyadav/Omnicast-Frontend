import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function GET(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });
  const tenantId = session?.user.tenant_id;

  if (!tenantId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/customers/${tenantId}/`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }

    const json = await res.json();

    return NextResponse.json({
      grouped_customers: json.grouped_customers,
      group_colors: json.group_colors,
    });
  } catch (err) {
    console.log(json);
    console.error("Fetch error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
