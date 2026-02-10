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
</script>

<template>
  <div class="container mx-auto max-w-2xl">
    <header class="flex justify-between items-center mt-5">
      <div>
        <NuxtLink
          to="/"
          class="text-xl font-semibold p-2 hover:bg-gray-200 underline"
          >Max</NuxtLink
        >
      </div>

      <Menu />
    </header>

    <main class="p-2">
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
</style>
