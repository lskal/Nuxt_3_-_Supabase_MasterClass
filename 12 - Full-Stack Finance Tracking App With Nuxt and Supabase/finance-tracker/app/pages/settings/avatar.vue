<script setup lang="ts">
import type { Database } from "~/types/database.types";
import { useAvatarUrl } from "../../composables/useAvatarUrl";

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const toast = useToast();

const file = ref<File | null>(null);
const pending = ref(false);

const avatarPath = computed(
  () => user.value?.user_metadata?.avatar_path ?? null,
);
const avatarUrl = useAvatarUrl(avatarPath);

const onFile = (files: FileList | null) => {
  file.value = files?.[0] ?? null;
};

const upload = async () => {
  if (!file.value || !user.value?.id) return;

  pending.value = true;
  try {
    const ext = file.value.name.split(".").pop() ?? "png";
    const path = `${user.value.id}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file.value, { upsert: true });

    if (uploadError) throw uploadError;

    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_path: path },
    });

    if (updateError) throw updateError;

    toast.add({ title: "Avatar updated", icon: "i-heroicons-check-circle" });

    // refresh user
    await supabase.auth.getUser();
  } catch (e: any) {
    toast.add({
      title: "Upload failed",
      description: e?.message ?? "Something went wrong",
      icon: "i-heroicons-exclamation-circle",
    });
  } finally {
    pending.value = false;
    file.value = null;
  }
};

const removeAvatar = async () => {
  if (!user.value?.id) return;

  pending.value = true;
  try {
    const currentPath = avatarPath.value;

    if (currentPath) {
      const { error } = await supabase.storage
        .from("avatars")
        .remove([currentPath]);
      if (error) throw error;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_path: null },
    });
    if (updateError) throw updateError;

    toast.add({ title: "Avatar removed", icon: "i-heroicons-check-circle" });
    await supabase.auth.getUser();
  } catch (e: any) {
    toast.add({
      title: "Delete failed",
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
    <template #header>Avatar</template>

    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <UAvatar :src="avatarUrl ?? undefined" alt="Avatar" size="lg" />
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Upload a profile image to Supabase Storage.
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        @change="onFile(($event.target as HTMLInputElement).files)"
      />

      <div class="flex gap-2 justify-end">
        <UButton
          variant="soft"
          :disabled="!file"
          :loading="pending"
          @click="upload"
        >
          Upload
        </UButton>
        <UButton
          variant="ghost"
          color="warning"
          :loading="pending"
          @click="removeAvatar"
        >
          Delete
        </UButton>
      </div>
    </div>
  </UCard>
</template>
