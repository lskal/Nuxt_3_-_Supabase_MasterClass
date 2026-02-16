import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { faker } from "@faker-js/faker";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  { auth: { persistSession: false } },
);

const categories = ["Food", "Housing", "Car", "Entertainment"];
const types = ["Income", "Expense", "Saving", "Investment"];

async function seedTransactions() {
  // Clear existing data
  const { error: deleteError } = await supabase
    .from("transactions")
    .delete()
    .neq("id", 0);

  if (deleteError) {
    console.error("Error deleting old data:", deleteError);
    return;
  }

  const transactions = [];

  for (let i = 0; i < 100; i++) {
    const type = faker.helpers.arrayElement(types);

    let category = null;
    if (type === "Expense") {
      category = faker.helpers.arrayElement(categories);
    }

    const amount =
      type === "Income"
        ? faker.number.int({ min: 1000, max: 5000 })
        : faker.number.int({ min: 10, max: 1000 });

    transactions.push({
      created_at: faker.date.recent({ days: 90 }).toISOString(),
      type,
      amount,
      description: faker.lorem.sentence(),
      category,
    });
  }

  const { error: insertError } = await supabase
    .from("transactions")
    .insert(transactions);

  if (insertError) {
    console.error("Error inserting data:", insertError);
  } else {
    console.log("Database seeded successfully.");
  }
}

seedTransactions().catch(console.error);
