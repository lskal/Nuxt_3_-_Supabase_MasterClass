<script setup lang="ts">
const { posts } = useListArticles({ limit: 3 });
</script>

<template>
  <slot :posts="posts">
    <section class="not-prose">
      <h1 class="text-2xl font-semibold mb-6">Blog</h1>

      <div class="grid grid-cols-[90px_1fr] text-xs text-gray-500 mb-2">
        <div>date</div>
        <div>title</div>
      </div>

      <div class="border-t border-gray-200">
        <ul v-if="posts?.length" class="divide-y divide-gray-200">
          <li v-for="post in posts" :key="post.path">
            <NuxtLink
              :to="post.path"
              class="grid grid-cols-[90px_1fr] items-center py-3 hover:bg-gray-100"
            >
              <div class="text-sm font-mono text-gray-500">
                <span v-if="post.displayYear">{{ post.year }}</span>
              </div>

              <div class="text-sm underline">
                {{ post.title ?? post.path }}
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>
  </slot>
</template>
