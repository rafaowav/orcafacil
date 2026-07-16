import { NextRequest, NextResponse } from "next/server";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

export async function GET(req: NextRequest) {
  if (!STRIPE_SECRET_KEY) {
    return NextResponse.json({ premium: false, error: "Stripe não configurado" });
  }

  const sessionId = req.nextUrl.searchParams.get("session_id");
  const email = req.nextUrl.searchParams.get("email");

  const Stripe = await import("stripe");
  const stripe = new Stripe.default(STRIPE_SECRET_KEY);

  if (sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid") {
        return NextResponse.json({
          premium: true,
          email: session.customer_details?.email || null,
        });
      }
    } catch {
      return NextResponse.json({ premium: false, error: "Sessão inválida" });
    }
  }

  if (email) {
    try {
      const sessions = await stripe.checkout.sessions.list({
        limit: 100,
        customer_details: { email },
      });

      const paid = sessions.data.find((s) => s.payment_status === "paid");
      if (paid) {
        return NextResponse.json({
          premium: true,
          session_id: paid.id,
          email: paid.customer_details?.email || null,
        });
      }
    } catch {
      return NextResponse.json({ premium: false, error: "Erro ao buscar email" });
    }
  }

  return NextResponse.json({ premium: false });
}
