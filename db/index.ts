import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from './schema'

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  throw new Error("DATABASE_URL is not set");
}


const pool = new Pool({ connectionString: DB_URL });
export const db = drizzle(pool, {schema});
