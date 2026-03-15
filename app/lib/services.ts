import { db } from "@/db";
import { getUserSession } from "./getUserSession";
import { userAccounts } from "@/db/schema";
import { eq, sum } from "drizzle-orm";
import { UserAccountData } from "../types";



export async function getUserAccountData(): Promise<UserAccountData> {
  try {
    const session = await getUserSession();

    if (!session) {
      return {
        accounts: [],
        totalBalanceResult: 0,
      };
    }

    const userId = session.id;

    const userFilter = eq(userAccounts.userId, userId);

    const [accounts, totalResult] = await Promise.all([
      db.select().from(userAccounts).where(userFilter),
      db
        .select({ total: sum(userAccounts.balance) })
        .from(userAccounts)
        .where(userFilter),
    ]);

    const totalBalanceResult = Number(totalResult[0]?.total ?? 0);

    return {
      accounts,
      totalBalanceResult,
    };

  } catch (error) {
    console.error("getUserAccountData failed", {
      error,
    });
    return {
      accounts: [],
      totalBalanceResult: 0,
    };
  }
}

// // get the accounts  for the user
// const accounts = await db
//   .select()
//   .from(userAccounts)
//   .where(eq(userAccounts.userId, userId));

// // get the total balance across all accounts for the user
// const totalResult = await db
//   .select({
//     total: sum(userAccounts.balance),
//   })
//   .from(userAccounts)
//   .where(eq(userAccounts.userId, userId));

// // handle case where totalResult is empty or total is null
// const totalBalance = Number(totalResult[0]?.total ?? 0);
