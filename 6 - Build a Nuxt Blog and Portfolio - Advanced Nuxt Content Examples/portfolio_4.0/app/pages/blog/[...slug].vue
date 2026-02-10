<script setup lang="ts">
const { page } = useContentPage("blog");
</script>

<template>
  <article
    class="prose dark:prose-invert prose-pre:bg-white dark:prose-pre:bg-gray-800 prose-pre:text-gray-700 dark:prose-pre:text-gray-300"
  >
    <ContentRenderer v-if="page" :value="page" />
    <p v-else>Not found</p>
  </article>
</template>
