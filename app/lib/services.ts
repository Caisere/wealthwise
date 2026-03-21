import { db } from "@/db";
import { getUserSession } from "./getUserSession";
import {
  budgets,
  categories,
  transactions,
  userAccounts,
  usersTable,
} from "@/db/schema";
import { and, eq, or, sum } from "drizzle-orm";
import { UserAccountData } from "../types";

export type UserAccountName = {
  name: string;
  id: string;
};

export type UserCategories = {
  name: string;
  id: string;
};

export type TransactionType = {
  id: string;
  description: string;
  amount: string;
  transactionId: string;
  type: "INCOME" | "EXPENSE";
  date: Date;
  accountName: string | null;
  categoryName: string | null;
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

export async function getUserAccounts(): Promise<{
  accountsName: UserAccountName[];
}> {
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
          id: userAccounts.id,
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

export async function getCategories(): Promise<{
  userCategories: UserCategories[];
}> {
  try {
    const session = await getUserSession();

    if (!session) {
      return {
        userCategories: [],
      };
    }

    const userId = session.id;

    const userCategories = await db
      .select({
        name: categories.name,
        id: categories.id,
      })
      .from(categories)
      .where(or(eq(categories.isDefault, true), eq(categories.userId, userId)));

    return {
      userCategories,
    };
  } catch (error) {
    console.error("getCategories failed", {
      error,
    });
    return {
      userCategories: [],
    };
  }
}

export async function getTransactions(): Promise<TransactionType[]> {
  try {
    const session = await getUserSession();

    if (!session) {
      return [];
    }

    const userId = session.id;

    const userTransactions: TransactionType[] = await db
      .select({
        id: transactions.id,
        description: transactions.description,
        amount: transactions.amount,
        transactionId: transactions.transactionId,
        type: transactions.type,
        date: transactions.date,
        accountName: userAccounts.name,
        categoryName: categories.name,
      })
      .from(transactions)
      .leftJoin(userAccounts, eq(transactions.accountId, userAccounts.id))
      .leftJoin(categories, eq(transactions.categoryId, categories.id))
      .where(eq(transactions.userId, userId));

    return userTransactions;
  } catch (error) {
    console.error("getCategories failed", {
      error,
    });
    return [];
  }
}

export async function getBudgetsData() {
  try {
    const session = await getUserSession();

    if (!session) {
      return {
        totalBudgetsBalance: 0,
        totalBudgetSpent: 0,
        AmountRemaining: 0,
        usersBudget: [],
      };
    }

    const userId = session.id;
    const userFilter = eq(budgets.userId, userId);

    const [totalBudgets, totalSpent, usersBudget] = await Promise.all([
      db
        .select({ total: sum(budgets.monthlyLimit) })
        .from(budgets)
        .where(userFilter),

      db
        .select({ total: sum(budgets.spent) })
        .from(budgets)
        .where(userFilter),

      db
        .select({
          spent: budgets.spent,
          id: budgets.id,
          monthlyLimit: budgets.monthlyLimit,
          month: budgets.month,
          alertAt: budgets.alertAt,
          categoryName: categories.name,
        })
        .from(budgets)
        .leftJoin(categories, eq(budgets.categoryId, categories.id))
        .where(and(eq(budgets.userId, userId))),
    ]);

    const totalBudgetsBalance = Number(totalBudgets?.[0].total);
    const totalBudgetSpent = Number(totalSpent?.[0].total);
    const AmountRemaining = totalBudgetsBalance - totalBudgetSpent;

    return {
      totalBudgetsBalance,
      totalBudgetSpent,
      AmountRemaining,
      usersBudget,
    };
  } catch (error) {
    console.error("getCategories failed", {
      error,
    });
    return {
      totalBudgetsBalance: 0,
      totalBudgetSpent: 0,
      AmountRemaining: 0,
      usersBudget: [],
    };
  }
}
