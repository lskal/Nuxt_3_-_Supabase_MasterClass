<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

type TTransactionRow = {
  id: number;
  created_at: string;
  amount: number;
  type: string;
  description: string | null;
  category: string | null;
};

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
    onSelect: () => console.log("Delete", props.transaction.id),
  },
] satisfies DropdownMenuItem[];
</script>

<template>
  <div
    class="grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-1">
        <UIcon
          :name="
            transaction.type === 'Income'
              ? 'i-heroicons-arrow-up-right'
              : 'i-heroicons-arrow-down-left'
          "
          :class="
            transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'
          "
        />
        <div>{{ transaction.description ?? transaction.type }}</div>
      </div>

      <!-- <UBadge class="text-black" >
        {{
          transaction.category !== "" ? transaction.category : "Uncategorized"
        }}
      </UBadge> -->
      <UBadge class="text-black" v-if="transaction.category"
        >{{ transaction.category }}
      </UBadge>
    </div>

    <div class="flex items-center justify-end space-x-2">
      <div>{{ useCurrency(transaction.amount) }}</div>

      <UDropdownMenu :items="items" :content="{ align: 'start' }">
        <UButton variant="ghost" icon="i-heroicons-ellipsis-horizontal" />
      </UDropdownMenu>
    </div>
  </div>
</template>
