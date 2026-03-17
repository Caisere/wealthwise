// app/api/webhooks/stripe/route.ts
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ Signature failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // Just log the event for now — no DB
  console.log("✅ Event received:", event.type);
  console.log("📦 Payload:", JSON.stringify(event.data.object, null, 2));

  return NextResponse.json({ received: true });
}
