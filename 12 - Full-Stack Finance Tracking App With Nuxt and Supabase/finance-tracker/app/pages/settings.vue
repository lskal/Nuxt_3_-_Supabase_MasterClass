<script setup lang="ts">
import { useRedirectIfUnauthenticated } from "~/composables/useRedirectIfUnauthenticated";

useRedirectIfUnauthenticated("/login");
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
    <aside class="md:col-span-1">
      <UVerticalNavigation
        :links="[
          { label: 'Profile', to: '/settings/profile' },
          { label: 'Avatar', to: '/settings/avatar' },
          { label: 'Settings', to: '/settings/settings' },
        ]"
      />
    </aside>

    <section class="md:col-span-3">
      <NuxtPage />
    </section>
  </div>
</template>
