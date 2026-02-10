<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection("blog").path(route.path).first(),
);

watchEffect(() => {
  if (!page.value) return;
  useSeoMeta({
    title: page.value.title,
    description: page.value.description,
    ogTitle: page.value.title,
    ogDescription: page.value.description,
  });
});

const tocLinks = computed(() => page.value?.body?.toc?.links ?? []);
const hasToc = computed(() => tocLinks.value.length > 0);

const { activeId } = useActiveHeading(
  computed(() => route.path),
  {
    selector: "article h2, article h3",
    threshold: 0.5,
    // tweak if you have a sticky header
    rootMargin: "0px ",
    // rootMargin: "0px 0px -60% 0px",
  },
);
</script>

<template>
  <article class="prose dark:prose-invert max-w-none">
    <div v-if="page" class="grid grid-cols-6 gap-16">
      <div
        :class="{ 'col-span-6 md:col-span-4': hasToc, 'col-span-6': !hasToc }"
      >
        <ContentRenderer :value="page" />
      </div>

      <aside v-if="hasToc" class="hidden md:col-span-2 md:block not-prose">
        <div class="sticky top-8">
          <div class="font-semibold mb-2">Table of contents</div>
          <TocLinks :links="tocLinks" :active-id="activeId" />
        </div>
      </aside>
    </div>

    <p v-else>Not found</p>
  </article>
</template>
