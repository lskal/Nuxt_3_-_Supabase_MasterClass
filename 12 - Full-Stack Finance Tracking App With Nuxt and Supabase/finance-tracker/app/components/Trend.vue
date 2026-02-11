<script setup lang="ts">
const props = defineProps({
  title: String,
  amount: Number,
  lastAmount: Number,
  color: String,
  loading: Boolean,
});

const colorClass = computed(() =>
  props.color === "green"
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400",
);
</script>

<template>
  <div>
    <div :class="['font-bold', colorClass]">
      {{ props.title }}
    </div>

    <div class="text-2xl font-extrabold text-black dark:text-white mb-2">
      <USkeleton class="h-8 w-full" v-if="loading" />
      <div v-else>{{ props.amount }}</div>
    </div>

    <div>
      <USkeleton class="h-6 w-full" v-if="loading" />
      <div v-else class="flex space-x-1 items-center text-sm">
        <UIcon
          name="i-heroicons-solid-trending-up"
          class="size-6"
          :class="[colorClass]"
        />
        <div class="text-gray-500 dark:text-gray-400">30% vs last period</div>
      </div>
    </div>
  </div>
</template>
