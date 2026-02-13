<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { getIcon, getIconColorClass, type TTransactionRow } from "../constants";

const props = defineProps<{
  transaction: TTransactionRow;
}>();

const items = [
  {
    label: "Edit",
    icon: "i-heroicons-pencil-square-20-solid",
    onSelect: () => console.log("Edit", props.transaction.id),
  },
  {
    label: "Delete",
    icon: "i-heroicons-trash-20-solid",
    onSelect: () => deleteTransaction,
  },
] satisfies DropdownMenuItem[];

const isIncome = computed(
  () => props.transaction.type.toLocaleLowerCase().trim() === "income",
);

const iconColorClass = computed(() => getIconColorClass(isIncome.value));

const icon = computed(() =>
  getIcon(
    isIncome.value,
    "i-heroicons-arrow-up-right",
    "i-heroicons-arrow-down-left",
  ),
);

const currency = useCurrency(props.transaction.amount);

const isLoading = ref(false);

const deleteTransaction = async () => {
  isLoading.value = true;

  try {
  } catch {
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    class="grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-1">
        <UIcon :name="icon" :class="iconColorClass" />
        <div>{{ transaction.description ?? transaction.type }}</div>
      </div>

      <UBadge class="text-black" v-if="transaction.category"
        >{{ transaction.category }}
      </UBadge>
    </div>

    <div class="flex items-center justify-end space-x-2">
      <div>{{ currency }}</div>

      <UDropdownMenu :items="items" :content="{ align: 'start' }">
        <UButton variant="ghost" icon="i-heroicons-ellipsis-horizontal" />
      </UDropdownMenu>
    </div>
  </div>
</template>
