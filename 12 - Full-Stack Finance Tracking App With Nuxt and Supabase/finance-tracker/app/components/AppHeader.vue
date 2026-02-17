<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const handleLogout = async () => {
  await supabase.auth.signOut();
  await navigateTo("/login");
};
</script>

<template>
  <header class="flex justify-between items-center mt-10">
    <NuxtLink to="/" class="text-xl font-bold"> Finance Tracker </NuxtLink>

    <div v-if="user" class="flex items-center gap-3">
      <UAvatar :alt="user.email ?? 'Avatar'">
        {{ user.email?.[0]?.toUpperCase() }}
      </UAvatar>

      <UButton size="xs" variant="ghost" @click="handleLogout">
        Logout
      </UButton>
    </div>

    <div v-else>
      <NuxtLink to="/login">
        <UButton size="xs" variant="ghost"> Login </UButton>
      </NuxtLink>
    </div>
  </header>
</template>
