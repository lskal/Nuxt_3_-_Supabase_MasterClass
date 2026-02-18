<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import {
  getIcon,
  getIconColorClass,
  isIncomeType,
  type TTransactionRow,
} from "../constants";

const props = defineProps<{ transaction: TTransactionRow }>();

const emit = defineEmits<{
  (e: "delete", id: number): void;
  (e: "edit", transaction: TTransactionRow): void;
}>();

const supabase = useSupabaseClient();
const toast = useToast();
const isLoading = ref(false);

const isIncome = computed(() => isIncomeType(props.transaction.type));
const iconColorClass = computed(() => getIconColorClass(isIncome.value));

const icon = computed(() =>
  getIcon(
    isIncome.value,
    "i-heroicons-arrow-up-right",
    "i-heroicons-arrow-down-left",
  ),
);

const currency = useCurrency(props.transaction.amount);

const deleteTransaction = async () => {
  if (isLoading.value) return;
  isLoading.value = true;

  try {
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", props.transaction.id);

    if (error) throw error;

    toast.add({
      title: "Transaction deleted",
      icon: "i-heroicons-check-circle",
    });

    emit("delete", props.transaction.id);
  } catch (err: any) {
    toast.add({
      title: "Delete failed",
      description: err?.message ?? "Something went wrong",
      icon: "i-heroicons-exclamation-circle",
    });
  } finally {
    isLoading.value = false;
  }
};

const items = [
  {
    label: "Edit",
    icon: "i-heroicons-pencil-square-20-solid",
    onSelect: () => emit("edit", props.transaction),
  },
  {
    label: "Delete",
    icon: "i-heroicons-trash-20-solid",
    onSelect: deleteTransaction,
  },
] satisfies DropdownMenuItem[];
</script>

<template>
  <div
    class="grid grid-cols-3 py-4 border-b border-gray-200 dark:border-gray-800"
  >
    <div class="flex items-center justify-between space-x-4 col-span-2">
      <div class="flex items-center space-x-2 min-w-0">
        <UIcon :name="icon" class="size-5" :class="iconColorClass" />
        <div class="truncate">
          {{ transaction.description ?? transaction.type }}
        </div>
      </div>

      <UBadge v-if="transaction.category" class="text-black shrink-0">
        {{ transaction.category }}
      </UBadge>
    </div>

    <div class="flex items-center justify-end space-x-2">
      <div>{{ currency }}</div>

      <UDropdownMenu :items="items" :content="{ align: 'start' }">
        <UButton
          variant="ghost"
          icon="i-heroicons-ellipsis-horizontal"
          :loading="isLoading"
        />
      </UDropdownMenu>
    </div>
  </div>
</template>
