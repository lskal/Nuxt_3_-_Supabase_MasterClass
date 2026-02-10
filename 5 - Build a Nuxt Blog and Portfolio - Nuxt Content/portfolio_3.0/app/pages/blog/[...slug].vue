<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
  // IMPORTANT: collection name must match content.config.ts --> "content: defineCollection({"
  return queryCollection("blog").path(route.path).first();
});

watchEffect(() => {
  if (!page.value) return;

  useSeoMeta({
    title: page.value.title,
    description: page.value.description,
    ogTitle: page.value.title,
    ogDescription: page.value.description,
  });
});
</script>

<template>
  <article class="prose dark:prose-invert">
    <ContentRenderer v-if="page" :value="page" />
    <p v-else>Not found</p>
  </article>
</template>
