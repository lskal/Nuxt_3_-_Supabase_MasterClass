import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { faker } from "@faker-js/faker";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
);

const categories = ["Food", "Housing", "Car", "Entertainment"];

function randomDateBetween(start, end) {
  const startMs = start.getTime();
  const endMs = end.getTime();
  const ms = faker.number.int({ min: startMs, max: endMs });
  return new Date(ms);
}

async function seedTransactions() {
  const { data: usersData, error: usersError } =
    await supabase.auth.admin.listUsers();

  if (usersError) {
    console.error("Error fetching users:", usersError);
    return;
  }

  const userIds = (usersData?.users ?? []).map((u) => u.id);

  if (!userIds.length) {
    console.warn("No users found.");
    return;
  }

  await supabase.from("transactions").delete().neq("id", 0);

  const now = new Date();

  const start = new Date(now);
  start.setMonth(start.getMonth() - 12); // 12 months ago

  const end = new Date(now);
  end.setMonth(end.getMonth() + 6); // 6 months ahead

  const transactions = [];

  for (const user_id of userIds) {
    for (let i = 0; i < 100; i++) {
      const date = randomDateBetween(start, end);

      const r = Math.random();
      let type;
      let category = null;

      if (r < 0.4) {
        type = "Expense";
        category = faker.helpers.arrayElement(categories);
      } else if (r < 0.65) {
        type = "Income";
      } else if (r < 0.85) {
        type = "Saving";
      } else {
        type = "Investment";
      }

      let amount = 0;
      switch (type) {
        case "Income":
          amount = faker.number.int({ min: 2000, max: 7000 });
          break;
        case "Expense":
          amount = faker.number.int({ min: 20, max: 1200 });
          break;
        case "Saving":
          amount = faker.number.int({ min: 200, max: 3000 });
          break;
        case "Investment":
          amount = faker.number.int({ min: 300, max: 6000 });
          break;
      }

      transactions.push({
        created_at: date.toISOString(),
        amount,
        type,
        description: faker.lorem.sentence(),
        category: type === "Expense" ? category : null,
        user_id,
      });
    }
  }

  await supabase.from("transactions").insert(transactions);

  console.log(`Seeded ${transactions.length} transactions.`);
}
