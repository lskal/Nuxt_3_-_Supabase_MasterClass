<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: user.value?.email ?? "",
      slot: "account",
      disabled: true,
      icon: undefined, // keep item shape consistent
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
      onSelect: () => console.log("Link to settings in the future"),
    },
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      onSelect: async () => {
        await supabase.auth.signOut();
        return navigateTo("/login");
      },
    },
  ],
]);
</script>

<template>
  <header class="flex justify-between items-center mt-10">
    <NuxtLink to="/" class="text-xl font-bold">Finance Tracker</NuxtLink>

    <div>
      <UDropdownMenu
        v-if="user"
        :items="items"
        :ui="{ item: 'cursor-pointer' }"
      >
        <UAvatar
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          alt="Avatar"
        />

        <template #account="{ item }: { item: any }">
          <div class="text-left cursor-text select-text">
            <p>Signed in as</p>
            <p class="font-medium text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
          </div>
        </template>

        <template #item="{ item }: { item: any }">
          <span class="truncate">{{ item.label }}</span>
          <UIcon
            v-if="item.icon"
            :name="item.icon"
            class="shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
          />
        </template>
      </UDropdownMenu>

      <NuxtLink v-else to="/login">
        <UButton size="xs" variant="ghost">Login</UButton>
      </NuxtLink>
    </div>
  </header>
</template>
