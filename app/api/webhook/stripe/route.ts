// app/api/webhooks/stripe/route.ts

import { stripe } from "@/app/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

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
  // Avoid logging full payload in production - contains sensitive data
  if (process.env.NODE_ENV === "development") {
    console.log("📦 Payload:", JSON.stringify(event.data.object, null, 2));
  }

  return NextResponse.json({ received: true });
}
