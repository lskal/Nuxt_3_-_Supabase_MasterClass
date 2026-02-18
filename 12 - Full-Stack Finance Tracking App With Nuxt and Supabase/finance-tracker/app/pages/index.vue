<script setup lang="ts">
import { transactionalViewOptions, type TTransactionRow } from "~/constants";
import DailyTransactionSummery from "../components/daily-transaction.summery.vue";
import { useSelectedTimePeriod } from "../composables/useSelectedTimePeriod";
import { useFetchTransactions } from "#imports";

const viewSelect = ref(transactionalViewOptions[1]);
const isOpen = ref(false);
const editingTransaction = ref<TTransactionRow | null>(null);

const { current, previous } = useSelectedTimePeriod(viewSelect as any);

const {
  pending,
  refresh,
  incomeCount,
  expenseCount,
  incomeTotal,
  expenseTotal,
  investmentTotal,
  savingTotal,
  grouped: { byDate },
} = useFetchTransactions(current);

const {
  refresh: refreshPrevious,
  incomeTotal: prevIncomeTotal,
  expenseTotal: prevExpenseTotal,
  investmentTotal: prevInvestmentTotal,
  savingTotal: prevSavingTotal,
} = useFetchTransactions(previous);

const closeModal = () => {
  isOpen.value = false;
  editingTransaction.value = null;
};

const openAdd = () => {
  editingTransaction.value = null;
  isOpen.value = true;
};

const openEdit = (t: TTransactionRow) => {
  editingTransaction.value = t;
  isOpen.value = true;
};

const handleSaved = async () => {
  closeModal();
  await Promise.all([refresh(), refreshPrevious()]);
};
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

      <UButton
        icon="i-heroicons-plus-circle"
        variant="solid"
        label="Add"
        @click="openAdd"
      />
    </div>
  </section>

  <UModal
    :open="isOpen"
    @update:open="(v) => (isOpen = v)"
    :ui="{ content: 'p-0' }"
  >
    <template #content>
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="font-semibold">
              {{ editingTransaction ? "Edit Transaction" : "Add Transaction" }}
            </div>

            <UButton
              icon="i-heroicons-x-mark"
              variant="ghost"
              @click="closeModal()"
            />
          </div>
        </template>

        <TransactionModal
          :transaction="editingTransaction"
          @close="closeModal"
          @saved="handleSaved"
        />
      </UCard>
    </template>
  </UModal>

  <section
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 md-10"
  >
    <Trend
      color="yellow"
      title="Income"
      :amount="incomeTotal"
      :last-amount="prevIncomeTotal"
      :loading="pending"
    />
    <Trend
      color="pink"
      title="Expense"
      :amount="expenseTotal"
      :last-amount="prevExpenseTotal"
      :loading="pending"
    />
    <Trend
      color="blue"
      title="Investments"
      :amount="investmentTotal"
      :last-amount="prevInvestmentTotal"
      :loading="pending"
    />
    <Trend
      color="gray"
      title="Saving"
      :amount="savingTotal"
      :last-amount="prevSavingTotal"
      :loading="pending"
    />
  </section>

  <section v-if="!pending" class="mt-10">
    <div v-for="(transactionsOnDay, date) in byDate" :key="date" class="mb-10">
      <DailyTransactionSummery :date="date" :transactions="transactionsOnDay" />

      <Transaction
        v-for="t in transactionsOnDay"
        :key="t.id"
        :transaction="t"
        @delete="refresh"
        @edit="openEdit(t)"
      />
    </div>
  </section>

  <section v-else class="mt-10">
    <USkeleton class="h-8 w-full mb-2" v-for="i in 4" :key="i" />
  </section>
</template>
