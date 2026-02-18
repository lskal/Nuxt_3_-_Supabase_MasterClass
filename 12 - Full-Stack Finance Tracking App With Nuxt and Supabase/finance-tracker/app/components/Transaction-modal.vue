<script setup lang="ts">
import { reactive, computed, ref, watch } from "vue";
import { z } from "zod";
import {
  categoriesOptions,
  typesOptions,
  type TCategory,
  type TTransactionType,
  type TTransactionRow,
} from "~/constants";
import type { Database } from "~/types/database.types";

type TransactionInsert = Database["public"]["Tables"]["transactions"]["Insert"];
type TransactionUpdate = Database["public"]["Tables"]["transactions"]["Update"];

// If your generated types are stale and missing user_id, this keeps TS happy.
// Once you regenerate types, this remains valid (it just becomes redundant).
type InsertWithUserId = TransactionInsert & { user_id: string };

const props = defineProps<{
  title?: string;
  transaction?: TTransactionRow | null; // when provided -> edit mode
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "saved"): void;
}>();

const supabase = useSupabaseClient<Database>();
const toast = useToast();

const formRef = ref<any>(null);
const isLoading = ref(false);

const today = new Date().toISOString().slice(0, 10);

const initialState = {
  type: undefined as TTransactionType | undefined,
  amount: 0,
  created_at: today,
  description: "",
  category: undefined as TCategory | undefined,
};

const state = reactive({ ...initialState });

const isEdit = computed(() => !!props.transaction?.id);
const showCategory = computed(() => state.type === "Expense");

// schema
const baseSchema = z.object({
  created_at: z.string().min(1, "Date is required"),
  description: z.string().optional(),
  amount: z.number().positive("Amount needs to be more than 0"),
});

const schema = z.intersection(
  z.discriminatedUnion("type", [
    z.object({ type: z.literal("Income") }),
    z.object({
      type: z.literal("Expense"),
      category: z.enum(categoriesOptions),
    }),
    z.object({ type: z.literal("Saving") }),
    z.object({ type: z.literal("Investment") }),
  ]),
  baseSchema,
);

watch(
  () => props.transaction,
  (t) => {
    if (!t) {
      Object.assign(state, initialState);
      formRef.value?.clear?.();
      return;
    }

    Object.assign(state, {
      type: t.type as TTransactionType,
      amount: Number(t.amount ?? 0),
      created_at: (t.created_at ?? today).slice(0, 10),
      description: t.description ?? "",
      category: (t.category ?? undefined) as any,
    });

    formRef.value?.clear?.();
  },
  { immediate: true },
);

const resetForm = () => {
  Object.assign(state, initialState);
  formRef.value?.clear?.();
};

const closeModal = () => {
  resetForm();
  emit("close");
};

const save = async () => {
  await formRef.value?.validate?.();
  if (formRef.value?.errors?.length) return;
  if (!state.type) return;

  isLoading.value = true;

  try {
    // ✅ reliable auth check (avoids “not logged in” during hydration)
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    const userId = session?.user?.id;

    if (!userId) {
      toast.add({
        title: "You are not logged in",
        description: "Please sign in again and retry.",
        icon: "i-heroicons-exclamation-circle",
      });
      return;
    }

    if (isEdit.value && props.transaction?.id) {
      const payload: TransactionUpdate = {
        type: state.type,
        amount: Number(state.amount) || 0,
        created_at: state.created_at,
        description: state.description || null,
        category: state.type === "Expense" ? (state.category ?? null) : null,
      };

      const { error } = await supabase
        .from("transactions")
        .update(payload)
        .eq("id", props.transaction.id);

      if (error) throw error;

      toast.add({
        title: "Transaction updated",
        icon: "i-heroicons-check-circle",
      });
      emit("saved");
      emit("close");
      return;
    }

    // ADD mode
    const payload: InsertWithUserId = {
      type: state.type,
      amount: Number(state.amount) || 0,
      created_at: state.created_at,
      description: state.description || null,
      category: state.type === "Expense" ? (state.category ?? null) : null,
      user_id: userId,
    };

    const { error } = await supabase.from("transactions").insert(payload);

    if (error) throw error;

    toast.add({ title: "Transaction saved", icon: "i-heroicons-check-circle" });
    emit("saved");
    resetForm();
    emit("close");
  } catch (e: any) {
    toast.add({
      title: isEdit.value ? "Update failed" : "Transaction not saved",
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
      {{ props.title ?? (isEdit ? "Edit Transaction" : "Add Transaction") }}
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
          {{ isEdit ? "Update" : "Save" }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>
