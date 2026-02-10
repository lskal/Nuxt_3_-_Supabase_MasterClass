<script setup>
const route = useRoute();

const enableCustomLayout = () => setPageLayout("another");

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("pages").path(route.path).first();
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
