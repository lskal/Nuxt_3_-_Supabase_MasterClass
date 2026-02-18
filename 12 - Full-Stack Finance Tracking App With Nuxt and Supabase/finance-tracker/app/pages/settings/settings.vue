<script setup lang="ts">
import type { Database } from "~/types/database.types";
import { transactionalViewOptions, type TTransactionalView } from "~/constants";

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const toast = useToast();

const pending = ref(false);

const selectedDefaultView = ref<TTransactionalView>(
  (user.value?.user_metadata?.transaction_view as TTransactionalView) ??
    transactionalViewOptions[1],
);

const save = async () => {
  pending.value = true;
  try {
    const { error } = await supabase.auth.updateUser({
      data: { transaction_view: selectedDefaultView.value },
    });
    if (error) throw error;

    toast.add({ title: "Preferences saved", icon: "i-heroicons-check-circle" });
  } catch (e: any) {
    toast.add({
      title: "Save failed",
      description: e?.message ?? "Something went wrong",
      icon: "i-heroicons-exclamation-circle",
    });
  } finally {
    pending.value = false;
  }
};
</script>

<template>
  <UCard>
    <template #header>Settings</template>

    <div class="space-y-4">
      <UFormGroup label="Default summary view">
        <USelect
          v-model="selectedDefaultView"
          :items="[...transactionalViewOptions]"
        />
      </UFormGroup>

      <div class="flex justify-end">
        <UButton :loading="pending" @click="save">Save</UButton>
      </div>
    </div>
  </UCard>
</template>
