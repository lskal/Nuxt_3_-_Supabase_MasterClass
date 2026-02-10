<script setup lang="ts">
import Menu from "../components/menu.vue";

useHead({
  titleTemplate: "%s - Max",
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
      crossorigin: "",
    },
  ],
});

// const colorMode = useColorMode();
// console.log(colorMode.preference);
// colorMode.preference = "light";
</script>

<template>
  <div class="container mx-auto max-w-4xl">
    <header class="flex justify-between items-start md:items-center mt-5">
      <div class="flex items-center md:space-x-12">
        <div class="hidden md:block">
          <NuxtLink
            to="/"
            class="text-xl font-semibold p-2 hover:bg-gray-200 dark:hover:bg-gray-800 underline"
            >Max</NuxtLink
          >
        </div>

        <Menu />
      </div>

      <ClientOnly>
        <ColorModeSelector />
      </ClientOnly>
    </header>

    <main class="p-2 mt-10">
      <slot />
    </main>
  </div>
</template>

<!-- <style scoped>
.header {
  display: flex;
  gap: 30px;
  margin-bottom: 10px;
}

.header > li {
  border: 1px solid tomato;
  padding: 10px;
  border-radius: 10px;
}
</style> -->

<style>
body {
  font-family: "Roboto";
}

body {
  @apply bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300;
}
</style>
