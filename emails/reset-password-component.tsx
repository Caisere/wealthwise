// emails/reset-password.tsx
import { formatDistanceToNow } from "date-fns";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Img,
  Preview,
  Tailwind,
} from "@react-email/components";

interface ResetPasswordComponentProps {
  username: string;
  resetLink?: string;
  expiresIn?: Date | null;
}

export default function ResetPasswordComponent({
  username = "Dear Customer",
  resetLink,
  expiresIn,
}: ResetPasswordComponentProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        Reset your password — link expires in{" "}
        {expiresIn
          ? formatDistanceToNow(new Date(expiresIn), { addSuffix: false })
          : "15 minutes"}
      </Preview>
      <Tailwind>
        <Body className="bg-[#f5f5f0] font-sans m-0 p-0">
          <Container className="max-w-[560px] mx-auto my-10">
            {/* Header */}
            <Section className="bg-[#111] rounded-t-xl px-8 py-6 text-center">
              <Text className="text-white text-xl font-semibold tracking-tight m-0">
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
                    background: "#f0f0eb",
                    borderRadius: "50%",
                    padding: "18px",
                    fontSize: "32px",
                  }}
                >
                  🔑
                </div>
              </Section>

              <Text className="text-[#111] text-2xl font-semibold mt-0 mb-2">
                Reset your password
              </Text>
              <Text className="text-[#555] text-base leading-relaxed mt-0">
                Hi {username}, we received a request to reset your password.
                Click the button below to choose a new one.
              </Text>

              {/* CTA Button */}
              <Section className="text-center my-8">
                <Button
                  href={resetLink}
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
                  Reset Password →
                </Button>
              </Section>

              {/* Expiry warning */}
              <Section
                style={{
                  background: "#fff8ec",
                  border: "1px solid #fde68a",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  marginBottom: "24px",
                }}
              >
                <Text className="text-[#92400e] text-sm m-0">
                  ⚠️ This link expires in{" "}
                  <strong>
                    {expiresIn
                      ? formatDistanceToNow(new Date(expiresIn), {
                          addSuffix: false,
                        })
                      : "15 minutes"}
                  </strong>
                  . If it expires, you can request a new one.
                </Text>
              </Section>

              <Hr className="border-[#e5e5e5] my-6" />

              {/* Fallback link */}
              <Text className="text-[#888] text-sm">
                If the button doesn&apos;t work, copy and paste this URL into
                your browser:
              </Text>
              <Text
                style={{
                  color: "#555",
                  fontSize: "12px",
                  wordBreak: "break-all",
                  background: "#f5f5f0",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  fontFamily: "monospace",
                }}
              >
                {resetLink}
              </Text>

              <Hr className="border-[#e5e5e5] my-6" />

              {/* Didn't request this */}
              <Text className="text-[#888] text-sm leading-relaxed">
                If you didn&apos;t request a password reset, you can safely
                ignore this email. Your password will remain unchanged.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="bg-[#f5f5f0] rounded-b-xl px-10 py-6 text-center">
              <Text className="text-[#aaa] text-xs m-0">
                © {new Date().getFullYear()} YourApp · 123 Startup Lane, San
                Francisco, CA
              </Text>
              <Text className="text-[#aaa] text-xs mt-1">
                <a href="#" style={{ color: "#aaa" }}>
                  Unsubscribe
                </a>
                {" · "}
                <a href="#" style={{ color: "#aaa" }}>
                  Privacy Policy
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
