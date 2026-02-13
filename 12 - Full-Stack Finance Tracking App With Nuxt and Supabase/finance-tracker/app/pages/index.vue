<script setup lang="ts">
import {
  transactionalViewOptions,
  isIncomeType,
  type TTransactionRow,
} from "~/constants";
import DailyTransactionSummery from "~/components/Daily-transaction.summery.vue";

const supabase = useSupabaseClient();
const viewSelect = ref(transactionalViewOptions[1]);

// 1) Fetch + refresh()
const {
  data: transactions,
  pending,
  refresh,
  error,
} = await useAsyncData<TTransactionRow[]>("transactions", async () => {
  const { data, error } = await supabase.from("transactions").select("*");
  if (error) throw error;
  return data ?? [];
});

// 2) Group by date
type GroupedTransactions = Record<string, TTransactionRow[]>;

const transactionGroupedByDate = computed<GroupedTransactions>(() => {
  const grouped: GroupedTransactions = {};

  for (const t of transactions.value ?? []) {
    const date = new Date(t.created_at).toISOString().slice(0, 10);
    (grouped[date] ??= []).push(t);
  }

  return grouped;
});

// 3) Refresh after delete (emitted from <Transaction />)
const handleDeleted = async () => {
  await refresh();
};

// 4) Income / Expense lists (using your helper)
const income = computed(() =>
  (transactions.value ?? []).filter((t) => isIncomeType(t.type)),
);
const expense = computed(() =>
  (transactions.value ?? []).filter((t) => !isIncomeType(t.type)),
);

const incomeCount = computed(() => income.value.length);
const expenseCount = computed(() => expense.value.length);

const incomeTotal = computed(() =>
  income.value.reduce((sum, t) => sum + t.amount, 0),
);
const expenseTotal = computed(() =>
  expense.value.reduce((sum, t) => sum + t.amount, 0),
);
</script>

<template>
  <section class="flex items-center justify-between mb-10">
    <div>
      <h1 class="text-4xl font-extrabold">Summary</h1>

      <div class="text-gray-500 dark:text-gray-400 mt-2">
        You have {{ incomeCount }} incomes and {{ expenseCount }} expenses this
        period
      </div>
    </div>

    <div class="flex items-center gap-3">
      <USelectMenu
        :items="[...transactionalViewOptions]"
        v-model="viewSelect"
      />
      <UButton icon="i-heroicons-plus-circle" label="Add" />
    </div>
  </section>

  <section
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 md-10"
  >
    <Trend
      color="yellow"
      title="Income"
      :amount="incomeTotal"
      :last-amount="4100"
      :loading="pending"
    />
    <Trend
      color="pink"
      title="Expense"
      :amount="expenseTotal"
      :last-amount="3800"
      :loading="pending"
    />
    <Trend
      color="blue"
      title="Investments"
      :amount="4000"
      :last-amount="3000"
      :loading="pending"
    />
    <Trend
      color="gray"
      title="Saving"
      :amount="4000"
      :last-amount="4100"
      :loading="pending"
    />
  </section>

  <section v-if="!pending" class="mt-10">
    <div
      v-for="(transactionsOnDay, date) in transactionGroupedByDate"
      :key="date"
      class="mb-10"
    >
      <DailyTransactionSummery :date="date" :transactions="transactionsOnDay" />

      <Transaction
        v-for="t in transactionsOnDay"
        :key="t.id"
        :transaction="t"
        @delete="handleDeleted"
      />
    </div>
  </section>

  <section v-else class="mt-10">
    <USkeleton class="h-8 w-full mb-2" v-for="i in 4" :key="i" />
  </section>
</template>
