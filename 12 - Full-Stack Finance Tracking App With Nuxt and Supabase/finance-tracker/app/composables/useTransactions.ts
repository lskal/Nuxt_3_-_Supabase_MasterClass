import type { ComputedRef } from "vue";
import type { Database } from "~/types/database.types";
import type { TTransactionRow } from "~/constants";
import { endOfDay, startOfDay } from "date-fns";

type TimePeriod = {
  current: { from: Date; to: Date };
  previous: { from: Date; to: Date };
};

type Range = { from: Date; to: Date };

export const useTransactions = (dates?: ComputedRef<TimePeriod>) => {
  const supabase = useSupabaseClient<Database>();

  const currentTransactions = ref<TTransactionRow[]>([]);
  const previousTransactions = ref<TTransactionRow[]>([]);
  const pending = ref(false);

  const fetchRange = async (range: Range) => {
    const from = startOfDay(range.from).toISOString();
    const to = endOfDay(range.to).toISOString();

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .gte("created_at", from)
      .lte("created_at", to)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as TTransactionRow[];
  };

  const fetchTransactions = async () => {
    if (!dates?.value) return;

    pending.value = true;

    try {
      const [curr, prev] = await Promise.all([
        fetchRange(dates.value.current),
        fetchRange(dates.value.previous),
      ]);

      currentTransactions.value = curr;
      previousTransactions.value = prev;
    } catch (err) {
      console.error("fetchTransactions failed:", err);
      currentTransactions.value = [];
      previousTransactions.value = [];
    } finally {
      pending.value = false;
    }
  };

  const refresh = () => fetchTransactions();

  const incomeTotal = computed(() =>
    currentTransactions.value
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + (t.amount ?? 0), 0),
  );

  const expenseTotal = computed(() =>
    currentTransactions.value
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + (t.amount ?? 0), 0),
  );

  const previousIncomeTotal = computed(() =>
    previousTransactions.value
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + (t.amount ?? 0), 0),
  );

  const previousExpenseTotal = computed(() =>
    previousTransactions.value
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + (t.amount ?? 0), 0),
  );

  const groupedByDate = computed(() => {
    const grouped: Record<string, TTransactionRow[]> = {};

    for (const t of currentTransactions.value) {
      const date = new Date(t.created_at).toISOString().slice(0, 10);
      (grouped[date] ??= []).push(t);
    }

    return grouped;
  });

  watch(
    () => dates?.value,
    () => fetchTransactions(),
    { deep: true, immediate: true },
  );

  return {
    pending,

    // current period
    transactions: computed(() => currentTransactions.value),
    incomeTotal,
    expenseTotal,
    groupedByDate,

    // previous period totals for Trend
    previousIncomeTotal,
    previousExpenseTotal,

    refresh,
    fetchTransactions,
  };
};
