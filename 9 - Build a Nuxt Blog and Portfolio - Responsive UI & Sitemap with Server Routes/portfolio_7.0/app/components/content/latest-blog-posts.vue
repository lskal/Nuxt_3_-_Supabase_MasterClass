<template>
  <BlogPosts v-slot="{ posts }" :limit="limit">
    <div v-for="post in posts" :key="post.id">
      <NuxtLink
        :to="post.path"
        class="column group hover:bg-gray-100 dark:hover:bg-gray-800"
        >{{ post.title }}</NuxtLink
      >
    </div>
  </BlogPosts>
</template>

<script setup>
defineProps({
  limit: {
    type: Number,
    default: null,
  },
});
</script>
