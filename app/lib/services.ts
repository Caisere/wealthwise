import { db } from "@/db";
import { getUserSession } from "./getUserSession";
import { budgets, categories, transactions, userAccounts } from "@/db/schema";
import { and, desc, eq, gte, lte, ne, or, sql, sum } from "drizzle-orm";
import { UserAccountData } from "../types";
import {
  getCurrentMonthDate,
  getLastMonthDate,
  getPercentageChange,
  getSpecificMonthDate,
} from "./helper";

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

export type UserCatsWithTransSum = {
  name: string;
  total: string | null;
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
    console.error("getCatWithTransSum failed", {
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
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.createdAt));

    return userTransactions;
  } catch (error) {
    console.error("getCategories failed", {
      error,
    });
    return [];
  }
}

export async function getTotalIncAndExp() {
  try {
    const session = await getUserSession();

    if (!session) {
      return {
        totalIncomes: 0,
        totalExpenses: 0,
        lastMonthTotalExpenses: 0,
        lastMonthTotalIncomes: 0,
        percentageIncome: 0,
        percentageExpense: 0,
      };
    }

    const userId = session.id;

    const { currentMonthFirstDay, currentMonthLastDay } = getCurrentMonthDate();
    const { lastMonthFirstDay, lastMonthLastDay } = getLastMonthDate();

    const currentMonthQueryArr = [
      eq(transactions.userId, userId),
      gte(transactions.date, currentMonthFirstDay),
      lte(transactions.date, currentMonthLastDay),
    ];

    const lastMonthQueryArr = [
      eq(transactions.userId, userId),
      gte(transactions.date, lastMonthFirstDay),
      lte(transactions.date, lastMonthLastDay),
    ];

    const [
      lastMonthTotalInc,
      currentMonthTotalInc,
      lastMonthTotalExp,
      currentMonthTotalExp,
    ] = await Promise.all([
      // last month total Incomes
      db
        .select({
          total: sum(transactions.amount),
        })
        .from(transactions)
        .where(and(...lastMonthQueryArr, eq(transactions.type, "INCOME"))),

      // Current month total Incomes
      db
        .select({
          total: sum(transactions.amount),
        })
        .from(transactions)
        .where(and(...currentMonthQueryArr, eq(transactions.type, "INCOME"))),

      // last month total Expenses

      db
        .select({
          total: sum(transactions.amount),
        })
        .from(transactions)
        .where(and(...lastMonthQueryArr, eq(transactions.type, "EXPENSE"))),

      // current month total Expenses
      db
        .select({
          total: sum(transactions.amount),
        })
        .from(transactions)
        .where(and(...currentMonthQueryArr, eq(transactions.type, "EXPENSE"))),
    ]);

    const totalIncomes = Number(currentMonthTotalInc?.[0].total ?? 0);
    const totalExpenses = Number(currentMonthTotalExp?.[0].total ?? 0);
    const lastMonthTotalIncomes = Number(lastMonthTotalInc?.[0].total ?? 0);
    const lastMonthTotalExpenses = Number(lastMonthTotalExp?.[0].total ?? 0);

    const percentageIncome = getPercentageChange(
      totalIncomes,
      lastMonthTotalIncomes,
    );

    const percentageExpense = getPercentageChange(
      totalExpenses,
      lastMonthTotalExpenses,
    );

    return {
      totalIncomes,
      totalExpenses,
      lastMonthTotalExpenses,
      lastMonthTotalIncomes,
      percentageIncome,
      percentageExpense,
    };
  } catch (error) {
    console.error("getTotalIncAndExp failed", {
      error,
    });
    return {
      totalIncomes: 0,
      totalExpenses: 0,
      lastMonthTotalExpenses: 0,
      lastMonthTotalIncomes: 0,
      percentageIncome: 0,
      percentageExpense: 0,
    };
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
    console.error("getBudgetsData failed", {
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

export async function getCatWithTransSum(): Promise<{
  userCatsWithTransSum: UserCatsWithTransSum[];
}> {
  try {
    const session = await getUserSession();

    if (!session) {
      return {
        userCatsWithTransSum: [],
      };
    }

    const userId = session.id;

    const { currentMonthFirstDay, currentMonthLastDay } = getCurrentMonthDate();

    const userCatsWithTransSum = await db
      .select({
        name: categories.name,
        total: sum(transactions.amount),
      })
      .from(categories)
      .groupBy(categories.id, categories.name)
      .leftJoin(
        transactions,
        and(
          eq(transactions.categoryId, categories.id),
          eq(transactions.userId, userId),
          eq(transactions.type, "EXPENSE"),
        ),
      )
      .where(
        and(
          ne(categories.name, "Income"),
          gte(transactions.date, currentMonthFirstDay),
          lte(transactions.date, currentMonthLastDay),
          or(eq(categories.isDefault, true), eq(categories.userId, userId)),
        ),
      );

    return {
      userCatsWithTransSum,
    };
  } catch (error) {
    console.error("getCategories failed", {
      error,
    });
    return {
      userCatsWithTransSum: [],
    };
  }
}

export type GetIncAndExpTrans = {
  month: string;
  income: string;
  expense: string;
};

export async function getIncAndExpTrans(): Promise<GetIncAndExpTrans[]> {
  try {
    const session = await getUserSession();

    if (!session) {
      return [];
    }

    const userId = session.id;

    const { monthFirstDay } = getSpecificMonthDate(5);

    const userIncAndExpTrans: GetIncAndExpTrans[] = await db
      .select({
        month: sql<string>`TO_CHAR(${transactions.date}, 'Mon YYYY')`,
        income: sql<string>`COALESCE(SUM(CASE WHEN ${transactions.type} = 'INCOME' THEN ${transactions.amount} END), 0)`,
        expense: sql<string>`COALESCE(SUM(CASE WHEN ${transactions.type} = 'EXPENSE' THEN ${transactions.amount} END), 0)`,
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, userId),
          gte(transactions.date, monthFirstDay),
        ),
      )
      .groupBy(sql`TO_CHAR(${transactions.date}, 'Mon YYYY')`)
      .orderBy(sql`MIN(${transactions.date})`);

    return userIncAndExpTrans;
  } catch (error) {
    console.error("userIncAndExpTrans failed", {
      error,
    });
    return [];
  }
}

export async function getBudgetStatusData() {
  try {
    const session = await getUserSession();

    if (!session) {
      return [];
    }

    const userId = session.id;

    const { currentMonthFirstDay, currentMonthLastDay } = getCurrentMonthDate();
    const firstDay = currentMonthFirstDay.toISOString().split('T')[0]
    const lastDay = currentMonthLastDay.toISOString().split("T")[0];


    const userFilter = [
      eq(budgets.userId, userId),
      gte(budgets.month, firstDay),
      lte(budgets.month, lastDay),
    ];

    const totalBudgets = await db
        .select({
          spent: budgets.spent,
          monthlyLimit: budgets.monthlyLimit,
          categoryName: categories.name,
        })
        .from(budgets)
        .leftJoin(categories, eq(budgets.categoryId, categories.id))
        .groupBy(categories.name, budgets.spent, budgets.monthlyLimit)
        .where(and(...userFilter))

    const formattedData = totalBudgets.map((data) => ({
      cat: data.categoryName as string,
      spent: Number(data.spent),
      limit: Number(data.monthlyLimit),
    }));

    return formattedData;
  } catch (error) {
    console.error("getBudgetsStatusData failed", {
      error,
    });
    return [];
  }
}
