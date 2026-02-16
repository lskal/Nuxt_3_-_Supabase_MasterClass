<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import { z } from "zod";
import {
  categoriesOptions,
  typesOptions,
  type TCategory,
  type TTransactionType,
} from "~/constants";
import type { Database } from "~/types/database.types";
type TransactionInsert = Database["public"]["Tables"]["transactions"]["Insert"];

const props = defineProps<{ title?: string }>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "saved"): void;
}>();

const supabase = useSupabaseClient<Database>();
const toast = useToast();

const today = new Date().toISOString().slice(0, 10);

const formRef = ref<any>(null);
const isLoading = ref(false);

const initialState = {
  type: undefined as TTransactionType | undefined,
  amount: 0,
  created_at: today,
  description: "",
  category: undefined as TCategory | undefined,
};

const state = reactive({ ...initialState });

// base schema
const baseSchema = z.object({
  created_at: z.string().min(1, "Date is required"),
  description: z.string().optional(),
  amount: z.number().positive("Amount needs to be more than 0"),
});

// type schema
const incomeSchema = z.object({ type: z.literal("Income") });
const savingSchema = z.object({ type: z.literal("Saving") });
const investmentSchema = z.object({ type: z.literal("Investment") });
const expenseSchema = z.object({
  type: z.literal("Expense"),
  category: z.enum(categoriesOptions),
});

// Full schema
const schema = z.intersection(
  z.discriminatedUnion("type", [
    incomeSchema,
    expenseSchema,
    savingSchema,
    investmentSchema,
  ]),
  baseSchema,
);

const showCategory = computed(() => state.type === "Expense");

const resetForm = () => {
  Object.assign(state, initialState);
  formRef.value?.clear();
};

const closeModal = () => {
  resetForm();
  emit("close");
};

const save = async () => {
  // Validate schema errors before saving
  await formRef.value?.validate();
  if (formRef.value?.errors?.length) return;

  if (!state.type) return;

  isLoading.value = true;

  try {
    const payload: TransactionInsert = {
      type: state.type,
      amount: Number(state.amount) || 0,
      created_at: state.created_at,
      description: state.description || null,
      category: state.type === "Expense" ? (state.category ?? null) : null,
    };

    const { error } = await (supabase as any)
      .from("transactions")
      .insert(payload as any);

    if (error) throw error;

    toast.add({
      title: "Transaction saved",
      icon: "i-heroicons-check-circle",
    });

    emit("saved");
    resetForm();
    emit("close");
  } catch (e: any) {
    toast.add({
      title: "Transaction not saved",
      description: e?.message ?? "Something went wrong",
      icon: "i-heroicons-exclamation-circle",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="p-4">
    <div class="text-lg font-semibold mb-3">
      {{ props.title ?? "Add Transaction" }}
    </div>

    <UForm ref="formRef" :state="state" :schema="schema" @submit="save">
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

      <UFormField
        v-if="showCategory"
        label="Category"
        name="category"
        required
        class="mb-4"
      >
        <USelect
          v-model="state.category"
          :items="[...categoriesOptions]"
          placeholder="Category"
        />
      </UFormField>

      <div class="flex justify-end gap-2">
        <UButton type="button" variant="soft" @click="closeModal">
          Cancel
        </UButton>

        <UButton type="submit" variant="solid" :loading="isLoading">
          Save
        </UButton>
      </div>
    </UForm>
  </div>
</template>
