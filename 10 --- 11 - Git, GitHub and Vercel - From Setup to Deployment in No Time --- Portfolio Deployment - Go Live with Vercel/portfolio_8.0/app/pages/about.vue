<script setup>
const enableCustomLayout = () => setPageLayout("another");

const { page } = useContentPage("pages");

useHead({
  title: "About",
});
</script>

<template>
  <article class="prose dark:prose-invert max-w-none">
    <ContentRenderer v-if="page" :value="page" />
    <p v-else>Not found</p>
  </article>

  <button class="underline" @click="enableCustomLayout">
    show layout blog page!
  </button>
</template>
