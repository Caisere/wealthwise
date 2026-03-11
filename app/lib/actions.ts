'use server'

import { db } from "@/db";
import { RegisterSchema } from "../types";
import { usersTable } from "@/db/schema";
import { hashPassword } from "./helper";



export async function createUser({name, email, password}: RegisterSchema) {
  try {
    if (!name || !email || !password) {
      return {
        success: false,
        message: 'Invalid user input'
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
  } catch (error) {
    console.log('Error:', error)
    return {
      success: false,
      message: 'Server Error'
    }
  }
}