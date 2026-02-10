<!-- OLD TEMPLATE, but now is working with Nuxt Content  -->
<!-- <script setup>
const { posts } = useListArticles({ limit: 3 });
</script>

<template>
  <section>
    <h1 class="text-2xl font-semibold mb-4">Blog</h1>

    <ul v-if="posts?.length" class="space-y-2">
      <li v-for="post in posts" :key="post.path">
        <NuxtLink class="underline" :to="post.path">
          {{ post.title ?? post.path }}
        </NuxtLink>
      </li>
    </ul>
  </section>
</template> -->
<!-- OLD TEMPLATE, but now is working with Nuxt Content  -->

<template>
  <BlogPosts />
</template>
