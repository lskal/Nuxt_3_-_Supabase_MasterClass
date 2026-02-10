<template>
  <nav class="font-mono">
    <ul class="flex space-x-4">
      <li class="underline">
        <NuxtLink to="/about" class="link">About</NuxtLink>
      </li>

      <li class="underline">
        <NuxtLink to="/blog" class="link">Blog</NuxtLink>
      </li>

      <li class="underline">
        <NuxtLink to="/projects" class="link">Projects</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="postcss">
.link {
  @apply p-1 hover:bg-gray-200;
}
</style>
