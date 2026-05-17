import { generateHashedToken, hashPassword } from "@/app/lib/helper";
import { ResetPasswordServerSchema } from "@/app/types";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import PasswordResetSuccess from "@/emails/password-reset-success";
import { render } from "@react-email/components";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsedData = ResetPasswordServerSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsedData.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { email, token, newPassword } = parsedData.data;

    // email database look up for user to confirm user still active
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Request",
        },
        { status: 400 },
      );
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

    // re-hash the supplied token
    const hashedToken = generateHashedToken(token);

    // confirm the validity of hashed token and token expiration
    if (
      !user.resetHashedToken ||
      user.resetHashedToken !== hashedToken ||
      !user.resetTokenExpiry ||
      user.resetTokenExpiry < new Date()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Token invalid or expired",
        },
        { status: 400 },
      );
    }

    // hash new password
    const newPasswordHashed = await hashPassword(newPassword);

    // updating the password field and turning the resetHashedToken and resetTokenExpiry to null
    await db
      .update(usersTable)
      .set({
        password: newPasswordHashed,
        resetHashedToken: null,
        resetTokenExpiry: null,
      })
      .where(eq(usersTable.id, user.id))
      .returning();

    const loginLink = `${baseUrl}/login`;

    const html = await render(
      PasswordResetSuccess({
        loginLink,
        username: user.name!,
      }),
    );

    const { error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "omoshola.elegbede@preferreddigitalbusiness.com",
      subject: "Password Reset Successfully",
      html,
    });

    if (error) {
      // log error to observability sink
      return NextResponse.json({
        success: true,
        message:
          "Password reset successfully, but confirmation email could not be sent.",
      });
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
        message: "Failed to reset password",
      },
      { status: 500 },
    );
  }
}
