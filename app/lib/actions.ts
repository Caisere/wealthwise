'use server'

import { db } from "@/db";
import { RegisterFormData, RegisterSchema } from "../types";
import { usersTable } from "@/db/schema";
import { hashPassword } from "./helper";
import { eq } from "drizzle-orm";



export async function createUser(userInput: RegisterSchema) {
  try {

    const parsedData = RegisterFormData.safeParse(userInput)

    if (!parsedData.success) {
      return {
        success: false,
        message: 'Invalid user input'
      }
    }

    const {name, email, password} = parsedData.data
    
    const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email))

    if (existingUser) {
      return {
        success: false,
        message: 'Email already in use'
      }
    }

    const hashedPassword = await hashPassword(password)

    await db.insert(usersTable).values({
      name, email, password: hashedPassword
    })

    return {
      success: true,
      message: 'User created successfully'
    }
  } catch {
    return {
      success: false,
      message: 'Server Error'
    }
  }
}