"use server";

import { db } from "@/db";
import {
  AccountType,
  CreateBudgetDataType,
  CreateBudgetSchema,
  createTransactionSchema,
  RegisterFormData,
  RegisterSchema,
  Transaction,
  UpdatePasswordType,
  UpdateProfileSchema,
} from "../types";
import {
  budgets,
  categories,
  transactions,
  userAccounts,
  usersTable,
} from "@/db/schema";
import { comparePassword, hashPassword } from "./helper";
import { getUserSession } from "./getUserSession";
import { and, eq, gte, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

function isDbError(error: unknown): error is { code: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code: unknown }).code === "string"
  );
}

export async function createUser(userInput: RegisterSchema) {
  try {
    const parsedData = RegisterFormData.safeParse(userInput);

    if (!parsedData.success) {
      return {
        success: false,
        message: "Invalid user input",
      };
    }

    const { name, email, password } = parsedData.data;

    const hashedPassword = await hashPassword(password);

    await db.insert(usersTable).values({
      name,
      email,
      password: hashedPassword,
    });

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    if (isDbError(error) && error.code === "23505") {
      return { success: false, message: "Email already in use" };
    }
    return {
      success: false,
      message: "Server Error",
    };
  }
}

export async function updateUser(name: string, email: string) {
  try {
    const session = await getUserSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const parsedData = UpdateProfileSchema.safeParse({ name, email });

    if (!parsedData.success) {
      return {
        success: false,
        message: "Invalid input",
      };
    }

    const { name: updatedName, email: updatedEmail } = parsedData.data;

    const userId = session.id;

    await db
      .update(usersTable)
      .set({ name: updatedName, email: updatedEmail })
      .where(eq(usersTable.id, userId));

    revalidatePath("/settings");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    if (isDbError(error) && error.code === "23505") {
      return {
        success: false,
        message: "Email already in use",
      };
    }
    return {
      success: false,
      message: "Server Error",
    };
  }
}

export type DeleteUserReturnType = {
  success: boolean;
  message: string;
};

export type UpdatePasswordReturnType = {
  success: boolean;
  message: string;
};

export async function deleteUser(
  prevState: DeleteUserReturnType | null,
  formData: FormData,
): Promise<DeleteUserReturnType> {
  try {
    const session = await getUserSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const userPassword = formData.get("password") as string;

    if (typeof userPassword !== "string" || !userPassword) {
      return {
        success: false,
        message: "Password is required",
      };
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session.id));

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    if (!user.password) {
      return {
        success: false,
        message: "Account password not configured",
      };
    }

    const confirmPassword = await comparePassword(userPassword, user.password);

    if (!confirmPassword) {
      return {
        success: false,
        message: "Incorrect password",
      };
    }

    const userId = session.id;

    await db.delete(usersTable).where(eq(usersTable.id, userId));

    return {
      success: true,
      message: "Account deleted successfully",
    };
  } catch {
    return {
      success: false,
      message: "Server Error",
    };
  }
}

type userUpdatePasswordParams = Omit<UpdatePasswordType, "confirmNewPassword">;

export async function userUpdatePassword({
  currentPassword,
  newPassword,
}: userUpdatePasswordParams): Promise<UpdatePasswordReturnType> {
  try {
    const session = await getUserSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    if (
      typeof currentPassword !== "string" ||
      typeof newPassword !== "string" ||
      currentPassword.length < 8 ||
      newPassword.length < 8
    ) {
      return {
        success: false,
        message: "Invalid password input",
      };
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session.id));

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    if (!user.password) {
      return {
        success: false,
        message: "Account password not configured",
      };
    }

    const confirmPassword = await comparePassword(
      currentPassword,
      user.password,
    );

    if (!confirmPassword) {
      return {
        success: false,
        message: "Incorrect current password",
      };
    }

    const hashedNewPassword = await hashPassword(newPassword);

    await db
      .update(usersTable)
      .set({ password: hashedNewPassword })
      .where(eq(usersTable.id, session.id));

    return {
      success: true,
      message: "Password updated successfully",
    };
  } catch (error) {
    console.error("Error updating password:", error);
    return {
      success: false,
      message: "Server Error",
    };
  }
}

export async function addAccounts({
  name,
  type,
  balance,
  requestId,
}: {
  name: string;
  type: AccountType;
  balance: string;
  requestId: string;
}) {
  try {
    const session = await getUserSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    if (typeof name !== "string" || typeof balance !== "string") {
      return {
        success: false,
        message: "Invalid input",
      };
    }

    const normalizedName = name.trim();
    const normalizedBalance = balance.replace(/,/g, "").trim();
    const allowedTypes: AccountType[] = [
      "BANK",
      "EMONEY",
      "CASH",
      "SAVINGS",
      "CREDIT",
    ];
    const parsedBalance = Number(normalizedBalance);

    if (
      !normalizedName ||
      !allowedTypes.includes(type) ||
      !Number.isFinite(parsedBalance) ||
      parsedBalance < 0
    ) {
      return {
        success: false,
        message: "Invalid input",
      };
    }

    const newAccount = {
      userId: session.id,
      name: normalizedName,
      type,
      requestId: requestId,
      balance: parsedBalance.toFixed(2),
    };

    await db
      .insert(userAccounts)
      .values([newAccount])
      .onConflictDoUpdate({
        target: [userAccounts.userId, userAccounts.name],
        set: {
          balance: sql`${userAccounts.balance} + ${newAccount.balance}`,
        },
      });

    return {
      success: true,
      message: "Account added successfully",
    };
  } catch (error) {
    if (isDbError(error) && error.code === "23505") {
      const session = await getUserSession();

      if (!session) {
        return {
          success: false,
          message: "Unauthorized",
        };
      }

      const [existing] = await db
        .select()
        .from(userAccounts)
        .where(
          and(
            eq(userAccounts.requestId, requestId),
            eq(userAccounts.userId, session.id),
          ),
        );

      if (existing) {
        return {
          success: true,
          message: "Transaction successful",
        };
      }
    }

    console.error("Failed to add account:", error);
    return {
      success: false,
      message: "Server Error",
    };
  }
}

export async function addTransaction(data: Transaction) {
  try {
    const session = await getUserSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const parsedTransaction = createTransactionSchema.safeParse(data);

    if (!parsedTransaction.success) {
      return {
        success: false,
        message: "Invalid inputs",
      };
    }

    const {
      type,
      transactionId,
      amount,
      description,
      date,
      accountId,
      categoryId,
    } = parsedTransaction.data;

    const userId = session.id;

    if (categoryId) {
      const [category] = await db
        .select({ id: categories.id })
        .from(categories)
        .where(
          and(
            eq(categories.id, categoryId),
            or(eq(categories.userId, userId), eq(categories.isDefault, true)),
          ),
        );

      if (!category) {
        return {
          success: false,
          message: "Invalid category",
        };
      }
    }

    const queryCondition = [
      eq(userAccounts.id, accountId),
      eq(userAccounts.userId, userId),
    ];

    return await db.transaction(async (tx) => {
      // get user's current account balance
      const [account] = await tx
        .select()
        .from(userAccounts)
        .where(and(...queryCondition));

      if (!account) {
        return {
          success: false,
          message: "Account not found",
        };
      }

      // Convery balance tto Number
      const userCurrentBalance = Number(account.balance);

      // check for transaction type and and sufficient balance

      if (type === "EXPENSE") {
        if (userCurrentBalance < amount) {
          return {
            success: false,
            message: `Insufficient balance. Available balance is: ₦${userCurrentBalance.toLocaleString()}`,
          };
        } else {

          const [updateResult] = await tx
            .update(userAccounts)
            .set({ balance: sql`${userAccounts.balance} - ${amount}` })
            .where(
              and(
                ...queryCondition,
                gte(userAccounts.balance, String(amount)), // only deduct if enough funds
              ),
            )
            .returning({ id: userAccounts.id });

          if (!updateResult) {
            return {
              success: false,
              message:
                "Insufficient balance or concurrent modification. Please retry.",
            };
          }

          if (categoryId) {
            const result = await tx
              .update(budgets)
              .set({
                spent: sql`${budgets.spent} + ${amount}`,
              })
              .where(
                and(
                  eq(budgets.userId, userId),
                  eq(budgets.categoryId, categoryId),
                  gte(budgets.monthlyLimit, sql`${budgets.spent} + ${amount}`),
                  // const txMonth = new Date(date).toISOString().slice(0, 7) + "-01";
                  // eq(budgets.month, txMonth),
                ),
              );

            if (result.rowCount === 0) {
              return {
                success: false,
                message: "Budget Exceeded!",
              };
            }
          }

          await tx.insert(transactions).values({
            userId,
            accountId,
            transactionId,
            type,
            amount: amount.toString(),
            description,
            categoryId,
            date: new Date(date),
          });

          revalidatePath("/transactions");
          revalidatePath("/budgets");

          return {
            success: true,
            message: "Transaction added successfully",
          };
        }
      }

      await tx
        .update(userAccounts)
        .set({ balance: sql`${userAccounts.balance} + ${amount}` })
        .where(and(...queryCondition));

      await tx.insert(transactions).values({
        userId,
        accountId,
        transactionId,
        type,
        amount: amount.toString(),
        description,
        categoryId,
        date: new Date(date),
      });

      revalidatePath("/transactions");

      return {
        success: true,
        message: "Transaction added successfully",
      };
    });
  } catch (error) {
    console.error("addTransaction error:", error);
    return {
      success: false,
      message: "Failed to add transaction",
    };
  }
}

export async function AddBudget(data: CreateBudgetDataType) {
  try {
    const session = await getUserSession();

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const parsedData = CreateBudgetSchema.safeParse(data);

    if (!parsedData.success) {
      return {
        success: false,
        message: "Invalid inputs",
      };
    }

    const userId = session.id;

    // Validate category ownership
    const [category] = await db
      .select({ id: categories.id })
      .from(categories)
      .where(
        and(
          eq(categories.id, parsedData.data.categoryId),
          or(eq(categories.userId, userId), eq(categories.isDefault, true)),
        ),
      );

    if (!category) {
      return {
        success: false,
        message: "Invalid category",
      };
    }

    const monthDate = new Date(parsedData.data.month);

    if (isNaN(monthDate.getTime())) {
      return {
        success: false,
        message: "Invalid month format",
      };
    }

    const newBudget = {
      categoryId: parsedData.data.categoryId,
      monthlyLimit: parsedData.data.limit,
      month: monthDate.toISOString().split("T")[0],
      userId: session.id,
    };

    await db.insert(budgets).values({
      ...newBudget,
      monthlyLimit: String(newBudget.monthlyLimit),
    });

    revalidatePath("/budgets");

    return {
      success: true,
      message: "Budget added successfully",
    };
  } catch (error) {
    console.log(error);
    if (isDbError(error) && error.code === "23505") {
      return {
        success: false,
        message:
          "Budget for this category already exists for the selected month",
      };
    }
    return {
      success: false,
      message: "Server Error",
    };
  }
}
