<script setup lang="ts">
import type { Database } from "~/types/database.types";

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const toast = useToast();

const fullName = ref(user.value?.user_metadata?.full_name ?? "");
const newEmail = ref(user.value?.email ?? "");
const pending = ref(false);

const saveProfile = async () => {
  if (!user.value) return;

  pending.value = true;
  try {
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName.value },
    });

    if (error) throw error;

    toast.add({ title: "Profile updated", icon: "i-heroicons-check-circle" });
  } catch (e: any) {
    toast.add({
      title: "Profile update failed",
      description: e?.message ?? "Something went wrong",
      icon: "i-heroicons-exclamation-circle",
    });
  } finally {
    pending.value = false;
  }
};

const changeEmail = async () => {
  pending.value = true;
  try {
    const { error } = await supabase.auth.updateUser({ email: newEmail.value });
    if (error) throw error;

    toast.add({
      title: "Email change requested",
      description: "Check your inbox to confirm the new email.",
      icon: "i-heroicons-check-circle",
    });
  } catch (e: any) {
    toast.add({
      title: "Email change failed",
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
    <template #header>Profile</template>

    <div class="space-y-4">
      <UFormGroup label="Full name">
        <UInput v-model="fullName" placeholder="Your name" />
      </UFormGroup>

      <div class="flex justify-end">
        <UButton :loading="pending" @click="saveProfile">Save</UButton>
      </div>

      <UDivider />

      <UFormGroup label="Email">
        <UInput v-model="newEmail" type="email" />
      </UFormGroup>

      <div class="flex justify-end">
        <UButton variant="soft" :loading="pending" @click="changeEmail">
          Change email
        </UButton>
      </div>
    </div>
  </UCard>
</template>
