import AuthPanel from "@/app/components/layout/auth-panel";
import { ResetPasswordForm } from "@/app/components/form/reset-password-form";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string; email: string }>;
}) {
  const { token, email } = await searchParams;

  return (
    <AuthPanel 
      resetPassword={true}
      title="Reset Your Password"
      sub="Complete your password reset and continue to login."
    >
      <ResetPasswordForm token={token} email={email} />
    </AuthPanel>
  );
}
