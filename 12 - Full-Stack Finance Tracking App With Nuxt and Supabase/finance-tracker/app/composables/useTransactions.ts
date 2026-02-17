import type { ComputedRef } from "vue";
import type { Database } from "~/types/database.types";
import type { TTransactionRow } from "~/constants";
import { endOfDay, startOfDay } from "date-fns";

type TimePeriod = {
  current: { from: Date; to: Date };
  previous: { from: Date; to: Date };
};

export const useTransactions = (dates?: ComputedRef<TimePeriod>) => {
  const supabase = useSupabaseClient<Database>();

  const rawTransactions = ref<TTransactionRow[]>([]);
  const pending = ref(false);

  const fetchTransactions = async () => {
    pending.value = true;

    try {
      let query = supabase.from("transactions").select("*");

      if (dates?.value?.current) {
        const from = startOfDay(dates.value.current.from).toISOString();
        const to = endOfDay(dates.value.current.to).toISOString();
        query = query.gte("created_at", from).lte("created_at", to);
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) throw error;

      rawTransactions.value = data ?? [];
    } catch (err) {
      console.error("fetchTransactions failed:", err);
      rawTransactions.value = [];
    } finally {
      pending.value = false;
    }
  };

  const refresh = () => fetchTransactions();

  const currentTransactions = computed(() => rawTransactions.value);

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

  const groupedByDate = computed(() => {
    const grouped: Record<string, TTransactionRow[]> = {};

    for (const t of currentTransactions.value) {
      const date = new Date(t.created_at).toISOString().slice(0, 10);
      (grouped[date] ??= []).push(t);
    }

    return grouped;
  });

  // auto-fetch when dates change
  watch(
    () => dates?.value?.current,
    () => fetchTransactions(),
    { deep: true, immediate: true },
  );

  return {
    transactions: currentTransactions,
    pending,
    incomeTotal,
    expenseTotal,
    groupedByDate,
    refresh,
    fetchTransactions,
  };
};
