<!-- <template>
  <div>
    <h2 class="text-2xl font-semibold mb-10">Projects</h2>
    <ProjectList />
  </div>
</template> -->

<!-- <ProjectList /> no longer in use this way, now is being called in projects.md using content with
::ProjectList
::
-->

<script setup lang="ts">
const { page } = useContentPage("pages");
</script>

<template>
  <article class="prose dark:prose-invert max-w-none">
    <ContentRenderer v-if="page" :value="page" />
    <p v-else>Not found</p>
  </article>
</template>
