<script setup lang="ts">
type Repo = {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  description: string | null;
};

const { data, pending, error } = await useFetch<Repo[]>(
  "https://api.github.com/users/piotr-jura-udemy/repos",
  {
    // optional but nice: avoid GitHub API caching weirdness during dev
    headers: { Accept: "application/vnd.github+json" },
  },
);

const repos = computed(() =>
  (data.value ?? [])
    .filter((r) => r.description)
    .sort((a, b) => b.stargazers_count - a.stargazers_count),
);
</script>

<template>
  <div class="not-prose">
    <p v-if="pending">Loading…</p>
    <p v-else-if="error">Something went wrong. Try again!</p>

    <ul v-else class="grid grid-cols-1 gap-4">
      <li
        v-for="repo in repos"
        :key="repo.id"
        class="border border-gray-200 rounded p-4"
      >
        <a :href="repo.html_url" target="_blank" class="block">
          <div class="flex items-center justify-between">
            <div class="font-semibold">{{ repo.name }}</div>
            <div>{{ repo.stargazers_count }}</div>
          </div>

          <p class="mt-2 text-sm">
            {{ repo.description }}
          </p>
        </a>
      </li>
    </ul>
  </div>
</template>
