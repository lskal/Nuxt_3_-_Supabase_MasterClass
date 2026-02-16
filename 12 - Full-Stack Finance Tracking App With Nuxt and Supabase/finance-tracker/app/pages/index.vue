<script setup lang="ts">
import { transactionalViewOptions } from "~/constants";
import DailyTransactionSummery from "~/components/Daily-transaction.summery.vue";

const viewSelect = ref(transactionalViewOptions[1]);
const isOpen = ref(false);

const {
  pending,
  incomeTotal,
  expenseTotal,
  groupedByDate,
  refresh,
  fetchTransactions,
} = useTransactions();

onMounted(fetchTransactions);

const closeModal = () => (isOpen.value = false);
</script>

<template>
  <!-- Header -->
  <section class="flex items-center justify-between mb-10">
    <div>
      <h1 class="text-4xl font-extrabold">Summary</h1>
      <div class="text-gray-500 dark:text-gray-400 mt-2">
        <!-- Optional: if you want counts again, add them to composable -->
        Your transactions overview for this period
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
        @click="isOpen = true"
      />
    </div>
  </section>

  <!-- Modal -->
  <UModal
    :open="isOpen"
    @update:open="(v) => (isOpen = v)"
    :ui="{ content: 'p-0' }"
  >
    <template #content>
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="font-semibold">Add Transaction</div>

            <UButton
              icon="i-heroicons-x-mark"
              variant="ghost"
              @click="closeModal()"
            />
          </div>
        </template>

        <TransactionModal
          @close="closeModal"
          @saved="
            async () => {
              closeModal();
              await refresh();
            }
          "
        />
      </UCard>
    </template>
  </UModal>

  <!-- Trends -->
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

  <!-- Transactions -->
  <section v-if="!pending" class="mt-10">
    <div
      v-for="(transactionsOnDay, date) in groupedByDate"
      :key="date"
      class="mb-10"
    >
      <DailyTransactionSummery :date="date" :transactions="transactionsOnDay" />

      <Transaction
        v-for="t in transactionsOnDay"
        :key="t.id"
        :transaction="t"
        @delete="refresh"
      />
    </div>
  </section>

  <section v-else class="mt-10">
    <USkeleton class="h-8 w-full mb-2" v-for="i in 4" :key="i" />
  </section>
</template>
