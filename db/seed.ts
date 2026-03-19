import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { categories, NewCategory } from "./schema";

const db = drizzle(process.env.DATABASE_URL!);

const DefaultCategories: NewCategory[] = [
  {
    name: "Food & Groceries",
    isDefault: true,
  },
  {
    name: "Transport",
    isDefault: true,
  },
  {
    name: "Utilities",
    isDefault: true,
  },
  {
    name: "Entertainment",
    isDefault: true,
  },
  {
    name: "Rent",
    isDefault: true,
  },
  {
    name: "Income",
    isDefault: true,
  },
  {
    name: "Health",
    isDefault: true,
  },
];

async function main() {
  await db.insert(categories).values(DefaultCategories);
  console.log("default categories created successfully");
}

main();
