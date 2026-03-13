import { getUserSession } from "@/app/lib/getUserSession";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getUserSession();

    if (!session) {
      return NextResponse.json(
        { status: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const userId = session.id;
    const body = await req.json()
    
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json({
        status: false,
        message: "Name and email are required",
      }, { status: 400 });
    }
    
    const updatedUser = {
      name,
      email,
    };

    return new Response(JSON.stringify(updatedUser), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
