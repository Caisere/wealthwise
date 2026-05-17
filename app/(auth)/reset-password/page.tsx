import AuthPanel from "@/app/components/layout/auth-panel";
import { ResetPasswordForm } from "@/app/components/form/reset-password-form";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string | string[]; email: string | string[] }>;
}) {
  const { token, email } = await searchParams;

  const normalizedToken = Array.isArray(token) ? token[0] : token;
  const normalizedEmail = Array.isArray(email) ? email[0] : email;

  if (!normalizedToken || !normalizedEmail) {
    return (
      <AuthPanel
        resetPassword={true}
        title="Invalid reset link"
        sub="Please request a new password reset link."
      >
        <div />
      </AuthPanel>
    );
  }

  return (
    <AuthPanel
      resetPassword={true}
      title="Reset Your Password"
      sub="Complete your password reset and continue to login."
    >
      <ResetPasswordForm token={normalizedToken} email={normalizedEmail} />
    </AuthPanel>
  );
}
