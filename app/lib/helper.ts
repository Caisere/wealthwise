import "server-only";

import bcrypt from "bcrypt";

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

export function getSpecificMonthDate(month:number) {
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
    currentMonthFirstDay, currentMonthLastDay
  }
}

export function getPercentageChange(current: number, previous: number){
  // both zero, no change
  if (previous === 0 && current === 0) return 0;

  // new data, 100% growth
  if (previous === 0) return 100;

  if (current === 0) return -100;

  return ((current - previous) / previous) * 100;
};


