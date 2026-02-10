<template>
  <div class="container mx-auto max-w-2xl">
    <header class="flex justify-between items-center mt-5">
      <div>
        <NuxtLink to="/" class="text-xl font-semibold p-2 hover:bg-gray-200"
          >Max</NuxtLink
        >
      </div>

      <nav class="font-mono text-green-500">
        <ul class="flex space-x-4">
          <li class="underline">
            <NuxtLink to="/projects" class="link">Projects</NuxtLink>
          </li>

          <li class="underline">
            <NuxtLink to="/blog/first">First</NuxtLink>
          </li>

          <li class="underline">
            <NuxtLink to="/blog/vue-introduction">intro</NuxtLink>
          </li>

          <li class="underline">
            <NuxtLink to="/blog/2022/first">2022 first</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <main class="p-2 text-green-500">
      <slot />
    </main>
  </div>
</template>

<!-- <style scoped>
.header {
  display: flex;
  gap: 30px;
  margin-bottom: 10px;
}

.header > li {
  border: 1px solid tomato;
  padding: 10px;
  border-radius: 10px;
}
</style> -->
