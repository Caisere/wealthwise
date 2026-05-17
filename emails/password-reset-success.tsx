// emails/password-reset-success.tsx

import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Preview,
  Tailwind,
} from "@react-email/components";

interface PasswordResetSuccessProps {
  username: string;
  loginLink: string;
}

export default function PasswordResetSuccess({
  username = "Dear User",
  loginLink,
}: PasswordResetSuccessProps) {
  return (
    <Html lang="en">
      <Head />

      <Preview>
        Your password was successfully reset — you can now log in securely
      </Preview>

      <Tailwind>
        <Body className="bg-[#f5f5f0] font-sans m-0 p-0">
          <Container className="max-w-[560px] mx-auto my-10">
            {/* Header */}
            <Section className="bg-[#111] rounded-t-xl px-8 py-6 text-center">
              <Text className="text-white text-xl font-semibold m-0">
                WealthWise
              </Text>
            </Section>

            {/* Body */}
            <Section className="bg-white px-10 py-10">
              {/* Icon */}
              <Section className="text-center mb-6">
                <div
                  style={{
                    display: "inline-block",
                    background: "#ecfdf5",
                    borderRadius: "50%",
                    padding: "18px",
                    fontSize: "32px",
                  }}
                >
                  🔐
                </div>
              </Section>

              <Text className="text-[#111] text-2xl font-semibold mt-0 mb-2">
                Password reset successful
              </Text>

              <Text className="text-[#555] text-base leading-relaxed mt-0">
                Hi {username}, your password has been successfully updated. You
                can now log in to your account using your new credentials.
              </Text>

              {/* CTA */}
              <Section className="text-center my-8">
                <Button
                  href={loginLink}
                  style={{
                    background: "#111",
                    color: "#fff",
                    padding: "14px 32px",
                    borderRadius: "8px",
                    fontSize: "15px",
                    fontWeight: "600",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  Log In →
                </Button>
              </Section>

              <Hr className="border-[#e5e5e5] my-6" />

              {/* Security note */}
              <Text className="text-[#888] text-sm leading-relaxed">
                If you did not perform this action, please reset your password
                immediately or contact support to secure your account.
              </Text>

              <Text className="text-[#888] text-sm mt-4">
                For your security, we recommend using a strong, unique password
                and enabling additional account protection if available.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="bg-[#f5f5f0] rounded-b-xl px-10 py-6 text-center">
              <Text className="text-[#aaa] text-xs m-0">
                © {new Date().getFullYear()} WealthWise
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
