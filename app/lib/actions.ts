"use server";

import { db } from "@/db";
import {
  AccountType,
  RegisterFormData,
  RegisterSchema,
  UpdatePasswordType,
  UpdateProfileSchema,
} from "../types";
import { accountTypeEnum, userAccounts, usersTable } from "@/db/schema";
import { comparePassword, hashPassword } from "./helper";
import { getUserSession } from "./getUserSession";
import { eq, sql } from "drizzle-orm";
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
}: {
  name: string;
  type: AccountType;
  balance: string;
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
      })

    return {
      success: true,
      message: "Account added successfully",
    };
  } catch (error) {
    console.error("Failed to add account:", error);
    return {
      success: false,
      message: "Server Error",
    };
  }
}
