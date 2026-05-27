import {
  generateTokenExpiry,
  handleResetToken,
  sendEmailNotification,
} from "@/app/lib/helper";
import { ResetPasswordSchema } from "@/app/types";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import ResetPasswordComponent from "@/emails/reset-password-component";
import { render } from "@react-email/components";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsedEmail = ResetPasswordSchema.safeParse(body.validEmail);

    if (!parsedEmail.success) {
      return NextResponse.json({
        success: false,
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
        success: true,
        message:
          "If email exists, link has been sent. check your email for reset link",
      });
    }

    // gate check for Oauth manages their password, not stored in db
    if (!user.password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This account uses a third-party login provider. Please sign in using your OAuth provider instead.",
        },
        { status: 400 },
      );
    }

    const { token, hashedToken } = handleResetToken();

    const expiry = generateTokenExpiry();

    // add hashed token to db and expiryTime
    const [userDetails] = await db
      .update(usersTable)
      .set({ resetHashedToken: hashedToken, resetTokenExpiry: expiry })
      .where(eq(usersTable.id, user.id))
      .returning();

    // const resetLink = `${baseUrl}/reset-password?token=${token}&email=${email}`;

    // solves raw token/email interpolation invalid links generation for legitimate value because of special characters in supplied email
    const url = new URL("/reset-password", baseUrl);
    url.searchParams.set("token", token as string);
    url.searchParams.set("email", email);

    const resetLink = url.toString();

    const expiresIn = userDetails.resetTokenExpiry;

    const html = await render(
      ResetPasswordComponent({
        resetLink,
        username: userDetails.name || "User",
        expiresIn,
      }),
    );

    const subject = "Password Reset Successfully";

    const { error } = await sendEmailNotification({ html, subject });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || "error from resend",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "password reset successfully",
    });
  } catch {
    // const err = error instanceof Error ? error.message : "Failed to reset password";
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process reset request",
      },
      { status: 500 },
    );
  }
}
