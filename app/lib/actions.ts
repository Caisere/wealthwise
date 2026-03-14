"use server";

import { db } from "@/db";
import {
  RegisterFormData,
  RegisterSchema,
  UpdateProfileSchema,
} from "../types";
import { usersTable } from "@/db/schema";
import { comparePassword, hashPassword } from "./helper";
import { getUserSession } from "./getUserSession";
import { eq } from "drizzle-orm";
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
