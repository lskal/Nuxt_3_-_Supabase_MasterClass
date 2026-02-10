<script setup>
const enableCustomLayout = () => setPageLayout("another");

const { page } = useContentPage("pages");

useHead({
  title: "About",
});
</script>

<template>
  <div>this page is about me</div>

  <article class="prose dark:prose-invert prose-h1:text-2xl">
    <ContentRenderer v-if="page" :value="page" />
    <p v-else>Not found</p>
  </article>

  <button class="underline" @click="enableCustomLayout">
    show layout blog page!
  </button>
</template>
