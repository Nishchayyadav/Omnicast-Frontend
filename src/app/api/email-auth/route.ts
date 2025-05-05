import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user.email;

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/store-email-creds/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          app_password: password,
          user_email: userEmail,
        }),
      }
    );

    if (!response.ok) {
      console.error("Django backend error:", await response.text());
      return new Response(JSON.stringify({ success: false }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending credentials:", error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
