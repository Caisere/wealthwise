import "server-only";

import bcrypt from "bcrypt";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.TEST_EMAIL!
const FROM = process.env.ORGANIZATION_EMAIL!

export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(password, hashedPassword);
}

export function getLastMonthDate() {
  const now = new Date();
  const lastMonthFirstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthLastDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
    23,
    59,
    59,
  );

  return {
    lastMonthFirstDay,
    lastMonthLastDay,
  };
}

export function getSpecificMonthDate(month: number) {
  const now = new Date();
  const monthFirstDay = new Date(now.getFullYear(), now.getMonth() - month, 1);
  const monthLastDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
    23,
    59,
    59,
  );

  return {
    monthFirstDay,
    monthLastDay,
  };
}

export function getCurrentMonthDate() {
  const now = new Date();
  const currentMonthFirstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const currentMonthLastDay = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
  );

  return {
    currentMonthFirstDay,
    currentMonthLastDay,
  };
}

export function getPercentageChange(current: number, previous: number) {
  // both zero, no change
  if (previous === 0 && current === 0) return 0;

  // new data, 100% growth
  if (previous === 0) return 100;

  if (current === 0) return -100;

  return ((current - previous) / previous) * 100;
}

// export function generateResetToken() {
//   const token = crypto.randomBytes(32).toString("hex");

//   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

//   return { token, hashedToken };
// }

// export function generateHashedToken(token: string) {
//   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
//   return hashedToken;
// }

export function handleResetToken(token?: string) {
  // if token is supply
  if (token) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    return { hashedToken };
  }

  // if no token is not supply
  // generate new token and hash it
  const newToken = crypto.randomBytes(32).toString("hex");

  // hash new token
  const hashedToken = crypto
    .createHash("sha256")
    .update(newToken)
    .digest("hex");

  // return newToken and hashedToken
  return { token: newToken, hashedToken };
}

export function generateTokenExpiry() {
  return new Date(Date.now() + 1000 * 60 * 15); // 15mins
}

type SendEmailProps = {
  html: string;
  from?: string;
  to?: string;
  subject: string;
};

export async function sendEmailNotification({
  html,
  from = FROM,
  to = TO,
  subject,
}: SendEmailProps) {
  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
  });

  return { error };
}
