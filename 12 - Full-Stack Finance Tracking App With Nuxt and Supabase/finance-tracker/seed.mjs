import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { faker } from "@faker-js/faker";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
);

const categories = ["Food", "Housing", "Car", "Entertainment"];

async function seedTransactions() {
  // 1) fetch all users (admin)
  const { data: usersData, error: usersError } =
    await supabase.auth.admin.listUsers();

  if (usersError) {
    console.error("Error fetching users:", usersError);
    return;
  }

  const userIds = (usersData?.users ?? []).map((u) => u.id);

  if (!userIds.length) {
    console.warn("No users found. Create at least 1 user first.");
    return;
  }

  // 2) clear existing transactions
  const { error: deleteError } = await supabase
    .from("transactions")
    .delete()
    .neq("id", 0);

  if (deleteError) {
    console.error("Error deleting old data:", deleteError);
    return;
  }

  const transactions = [];

  // 3) seed per user (roughly 2 years of data)
  for (const user_id of userIds) {
    for (
      let year = new Date().getFullYear();
      year >= new Date().getFullYear() - 2;
      year--
    ) {
      for (let i = 0; i < 10; i++) {
        const date = new Date(
          year,
          faker.number.int({ min: 0, max: 11 }),
          faker.number.int({ min: 1, max: 28 }),
        );

        // weighted type selection similar to tutor’s vibe
        const r = Math.random();
        let type = "Saving";
        let category = null;

        if (r < 0.85) {
          type = "Expense";
          category = faker.helpers.arrayElement(categories);
        } else if (r < 0.95) {
          type = "Income";
        } else {
          type = faker.helpers.arrayElement(["Saving", "Investment"]);
        }

        let amount = 0;
        switch (type) {
          case "Income":
            amount = faker.number.int({ min: 2000, max: 5000 });
            break;
          case "Expense":
            amount = faker.number.int({ min: 100, max: 1000 });
            break;
          case "Saving":
          case "Investment":
            amount = faker.number.int({ min: 500, max: 10000 });
            break;
          default:
            amount = 0;
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
  }

  // 4) insert
  const { error: insertError } = await supabase
    .from("transactions")
    .insert(transactions);

  if (insertError) {
    console.error("Error inserting data:", insertError);
  } else {
    console.log(
      `Database seeded successfully. Inserted: ${transactions.length}`,
    );
  }
}

seedTransactions().catch(console.error);
