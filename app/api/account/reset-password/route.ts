import { generateResetToken, generateTokenExpiry } from "@/app/lib/helper";
import {
  ResetPasswordSchema,
  ResponseType,
} from "@/app/types";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import ResetPasswordComponent from "@/emails/reset-password-component";
import { render } from "@react-email/components";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ResponseType>> {
  try {
    const body = await req.json();

    const parsedEmail = ResetPasswordSchema.safeParse(body.validEmail);

    if (!parsedEmail.success) {
      return NextResponse.json({
        status: false,
        message: "Error validating user input",
      });
    }

    const email = parsedEmail.data;

    // email database look up
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      return NextResponse.json({
        status: false,
        message:
          "If email exists, link has been sent. check your email for reset link",
      });
    }

    const { token, hashedToken } = generateResetToken();

    const expiry = generateTokenExpiry();

    // add hashed token to db and expiryTime
    const [userDetails] = await db
      .update(usersTable)
      .set({ resetHashedToken: hashedToken, resetTokenExpiry: expiry })
      .where(eq(usersTable.id, user.id))
      .returning();

    const resetLink = `${baseUrl}/reset-password?token=${token}&email=${email}`;

    const expiresIn = userDetails.resetTokenExpiry

    const html = await render(
      ResetPasswordComponent({
        resetLink,
        username: userDetails.name!,
        expiresIn,
      }),
    );

    const { error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "omoshola.elegbede@preferreddigitalbusiness.com",
      subject: "Reset your password",
      html,
    });

    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: error.message || "error from resend",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      status: true,
      message: "password reset successfully",
    });
  } catch (error) {
    const err =
      error instanceof Error ? error.message : "Failed to reset password";
    return NextResponse.json(
      {
        status: false,
        message: err,
      },
      { status: 500 },
    );
  }
}
