import type { ComputedRef } from "vue";
import type { Database } from "~/types/database.types";
import { isIncomeType, type TTransactionRow } from "~/constants";
import { endOfDay, startOfDay } from "date-fns";

export type TimeRange = {
  from: Date;
  to: Date;
};

export const useFetchTransactions = (period: ComputedRef<TimeRange>) => {
  const supabase = useSupabaseClient<Database>();

  const transactions = ref<TTransactionRow[]>([]);
  const pending = ref(false);

  const fetchTransactions = async () => {
    pending.value = true;

    try {
      const from = startOfDay(period.value.from).toISOString();
      const to = endOfDay(period.value.to).toISOString();

      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .gte("created_at", from)
        .lte("created_at", to)
        .order("created_at", { ascending: false });

      if (error) throw error;

      transactions.value = (data ?? []) as TTransactionRow[];
    } catch (e) {
      console.error("fetchTransactions failed:", e);
      transactions.value = [];
    } finally {
      pending.value = false;
    }
  };

  const refresh = async () => {
    await fetchTransactions();
  };

  const income = computed(() =>
    transactions.value.filter((t) => isIncomeType(t.type)),
  );

  const expense = computed(() =>
    transactions.value.filter((t) => !isIncomeType(t.type)),
  );

  const incomeCount = computed(() => income.value.length);
  const expenseCount = computed(() => expense.value.length);

  const incomeTotal = computed(() =>
    income.value.reduce((sum, t) => sum + (t.amount ?? 0), 0),
  );

  const expenseTotal = computed(() =>
    expense.value.reduce((sum, t) => sum + (t.amount ?? 0), 0),
  );

  const byDate = computed(() => {
    const grouped: Record<string, TTransactionRow[]> = {};

    for (const t of transactions.value) {
      const date = new Date(t.created_at).toISOString().slice(0, 10);
      (grouped[date] ??= []).push(t);
    }

    return grouped;
  });

  watch(period, refresh);

  return {
    pending,
    refresh,
    transactions,

    incomeCount,
    expenseCount,
    incomeTotal,
    expenseTotal,

    grouped: {
      byDate,
    },
  };
};
