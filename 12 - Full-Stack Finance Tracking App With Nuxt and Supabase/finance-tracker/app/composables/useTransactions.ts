import { isIncomeType, type TTransactionRow } from "~/constants";
import type { Database } from "~/types/database.types";

export const useTransactions = () => {
  const supabase = useSupabaseClient<Database>();

  const transactions = ref<TTransactionRow[]>([]);
  const pending = ref(false);

  const fetchTransactions = async () => {
    pending.value = true;

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      transactions.value = data;
    }

    pending.value = false;
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

  const incomeTotal = computed(() =>
    income.value.reduce((sum, t) => sum + t.amount, 0),
  );

  const expenseTotal = computed(() =>
    expense.value.reduce((sum, t) => sum + t.amount, 0),
  );

  const groupedByDate = computed(() => {
    const grouped: Record<string, TTransactionRow[]> = {};

    for (const t of transactions.value) {
      const date = new Date(t.created_at).toISOString().slice(0, 10);

      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(t);
    }

    return grouped;
  });

  return {
    transactions,
    pending,
    income,
    expense,
    incomeTotal,
    expenseTotal,
    groupedByDate,
    refresh,
    fetchTransactions,
  };
};
