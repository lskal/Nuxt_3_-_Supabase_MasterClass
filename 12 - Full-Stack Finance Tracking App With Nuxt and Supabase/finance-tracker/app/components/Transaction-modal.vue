<script setup lang="ts">
import { reactive } from "vue";
import {
  categoriesOptions,
  typesOptions,
  type TCategory,
  type TTransactionType,
} from "~/constants";

const props = defineProps<{
  title?: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (
    e: "submit",
    payload: {
      type: TTransactionType;
      amount: number;
      created_at: string;
      description: string;
      category: TCategory;
    },
  ): void;
}>();

const today = new Date().toISOString().slice(0, 10);

const state = reactive({
  type: undefined as TTransactionType | undefined,
  amount: 0,
  created_at: today,
  description: "",
  category: undefined as TCategory | undefined,
});

const onSubmit = () => {
  // required fields start empty, so guard before emitting
  if (!state.type || !state.category) return;

  emit("submit", {
    type: state.type,
    amount: Number(state.amount) || 0,
    created_at: state.created_at,
    description: state.description,
    category: state.category,
  });

  emit("close");
};
</script>

<template>
  <div class="p-4">
    <div class="text-lg font-semibold mb-3">
      {{ props.title ?? "Add Transaction" }}
    </div>

    <UForm :state="state" @submit="onSubmit">
      <UFormField label="Transaction Type" name="type" required class="mb-4">
        <USelect
          v-model="state.type"
          :items="[...typesOptions]"
          placeholder="Select the transaction type"
        />
      </UFormField>

      <UFormField label="Amount" name="amount" required class="mb-4">
        <UInput
          v-model.number="state.amount"
          type="number"
          placeholder="Amount"
        />
      </UFormField>

      <UFormField
        label="Transaction date"
        name="created_at"
        required
        class="mb-4"
      >
        <UInput v-model="state.created_at" type="date" />
      </UFormField>

      <UFormField
        label="Description"
        name="description"
        hint="Optional"
        class="mb-4"
      >
        <UInput v-model="state.description" placeholder="Description" />
      </UFormField>

      <UFormField label="Category" name="category" required class="mb-4">
        <USelect
          v-model="state.category"
          :items="[...categoriesOptions]"
          placeholder="Category"
        />
      </UFormField>

      <div class="flex justify-end gap-2">
        <UButton type="button" variant="soft" @click="emit('close')">
          Cancel
        </UButton>

        <UButton type="submit" variant="solid"> Save </UButton>
      </div>
    </UForm>
  </div>
</template>
