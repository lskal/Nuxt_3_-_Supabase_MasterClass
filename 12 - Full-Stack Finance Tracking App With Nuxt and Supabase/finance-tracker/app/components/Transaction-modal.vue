<script setup lang="ts">
import { reactive } from "vue";

const props = defineProps<{
  title?: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (
    e: "submit",
    payload: {
      type: string;
      amount: number;
      created_at: string;
      description: string;
      category: string;
    },
  ): void;
}>();

const today = new Date().toISOString().slice(0, 10);

const state = reactive({
  type: "" as string,
  amount: 0 as number,
  created_at: today,
  description: "",
  category: "" as string,
});

const onSubmit = () => {
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
          :items="['Income', 'Expense', 'Saving', 'Investment']"
          placeholder="Select the transaction type"
        />
      </UFormField>

      <UFormField label="Amount" name="amount" required class="mb-4">
        <UInput v-model="state.amount" type="number" placeholder="Amount" />
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
          :items="['Food', 'Housing', 'Car', 'Entertainment']"
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
