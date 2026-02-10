<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

useHead(() => ({
  status: 404,
  title: "Page not found",
}));
</script>

<template>
  <NuxtLayout>
    <section>
      <h1 class="text-4xl mb-4">STATUS: {{ props.error.status }}</h1>

      <h2 class="text-xl text-gray-500 dark:text-gray-400">
        {{ props.error.statusText }}
      </h2>

      <NuxtLink
        to="/"
        class="inline-block mt-4 py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Take me home
      </NuxtLink>
    </section>
  </NuxtLayout>
</template>

<!-- OLD 404 -->
<!-- <template>
  <main class="flex items-center justify-center h-screen">
    <article class="max-w-md text-center">
      <h1 class="text-5xl font-bold mb-4">{{ props.error.status }}</h1>
      <p class="text-gray-500 mb-4">{{ $props.error.statusText }}</p>
      <NuxtLink
        to="/"
        class="inline-block py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Take me home
      </NuxtLink>
    </article>
  </main>
</template> -->
