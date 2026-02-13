<script setup lang="ts">
import { transactionalViewOptions } from "~/constants";
import DailyTransactionSummery from "../components/Daily-transaction.summery.vue";

type TTransactionRow = {
  id: number;
  created_at: string;
  amount: number;
  type: string;
  description: string | null;
  category: string | null;
};

const supabase = useSupabaseClient();
const viewSelect = ref(transactionalViewOptions[1]);

const {
  data: transactions,
  pending,
  error,
} = await useAsyncData<TTransactionRow[]>("transactions", async () => {
  const { data, error } = await supabase.from("transactions").select("*");
  if (error) throw error;
  return (data ?? []) as TTransactionRow[];
});

type GroupedTransactions = { [key: string]: TTransactionRow[] };

const transactionGroupedByDate = computed(() => {
  const grouped: GroupedTransactions = {};

  for (const transaction of transactions.value ?? []) {
    const date = new Date(transaction.created_at).toISOString().slice(0, 10);

    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(transaction);
  }

  return grouped;
});
</script>

<template>
  <section class="flex items-center justify-between mb-10">
    <h1 class="text-4xl font-extrabold">Summary</h1>
    <div>
      <USelectMenu :items="transactionalViewOptions" v-model="viewSelect" />
    </div>
  </section>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 md-10"
  >
    <Trend
      color="yellow"
      title="Income"
      :amount="4000"
      :last-amount="3000"
      :loading="false"
    />
    <Trend
      color="pink"
      title="Expense"
      :amount="4000"
      :last-amount="5000"
      :loading="false"
    />
    <Trend
      color="blue"
      title="Investments"
      :amount="4000"
      :last-amount="3000"
      :loading="false"
    />
    <Trend
      color="gray"
      title="Saving"
      :amount="4000"
      :last-amount="4100"
      :loading="false"
    />
  </section>

  <section class="mt-10">
    <div
      v-for="(transactionsOnDay, date) in transactionGroupedByDate"
      :key="date"
      class="mb-10"
    >
      <DailyTransactionSummery :date="date" :transactions="transactionsOnDay" />
      <Transaction
        v-for="transaction in transactionsOnDay"
        :key="transaction.id"
        :transaction="transaction"
      />
    </div>
  </section>
</template>
