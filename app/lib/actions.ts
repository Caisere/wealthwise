"use server";

import { db } from "@/db";
import {
  RegisterFormData,
  RegisterSchema,
  UpdateProfileSchema,
} from "../types";
import { usersTable } from "@/db/schema";
import { hashPassword } from "./helper";
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
