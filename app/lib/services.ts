import { db } from "@/db";
import { getUserSession } from "./getUserSession";
import { userAccounts } from "@/db/schema";
import { eq, sum } from "drizzle-orm";
import { User, UserAccountData } from "../types";

export type UserAccountName = {
  name: string;
};

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


export async function getUserAccounts(): Promise<{ accountsName: UserAccountName[] }> {
  try {
    const session = await getUserSession();

    if (!session) {
      return {
        accountsName: [],
      };
    }

    const userId = session.id;

    const userFilter = eq(userAccounts.userId, userId);

    const [accountsName] = await Promise.all([
      db
        .select({
          name: userAccounts.name,
        })
        .from(userAccounts)
        .where(userFilter),
    ]);

    return {
      accountsName,
    };
  } catch (error) {
    console.error("getUserAccount failed", {
      error,
    });
    return {
      accountsName: [],
    };
  }
}
