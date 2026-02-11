<script setup lang="ts">
import { computed } from "vue";
import { getTrendColorClass, colorMap, type TTrendColor } from "~/constants";

const props = defineProps<{
  title: string;
  amount: number;
  lastAmount: number;
  color: TTrendColor;
  loading: boolean;
}>();

const colorClass = computed(() => getTrendColorClass(props.color));

const trandingUp = computed(() => props.amount >= props.lastAmount);

const icon = computed(() =>
  trandingUp.value
    ? "i-heroicons-solid-trending-up"
    : "i-heroicons-solid-trending-down",
);

const iconColorClass = computed(() =>
  trandingUp.value ? colorMap.green : colorMap.red,
);

const persantageTrend = computed(() => {
  if (props.amount === 0 || props.lastAmount === 0) return "∞%";

  const bigger = Math.max(props.amount, props.lastAmount);
  const smaller = Math.min(props.amount, props.lastAmount);

  const ratio = ((bigger - smaller) / smaller) * 100;

  return `${Math.ceil(ratio)}%`;
});
</script>

<template>
  <div>
    <div :class="['font-bold', colorClass]">
      {{ props.title }}
    </div>

    <div class="text-2xl font-extrabold text-black dark:text-white mb-2">
      <USkeleton class="h-8 w-full" v-if="loading" />
      <div v-else>
        {{ useCurrency(props.amount) }}
      </div>
    </div>

    <div>
      <USkeleton class="h-6 w-full" v-if="loading" />
      <div v-else class="flex space-x-1 items-center text-sm">
        <UIcon :name="icon" class="size-6" :class="iconColorClass" />
        <div class="text-gray-500 dark:text-gray-400">
          {{ persantageTrend }} vs last period
        </div>
      </div>
    </div>
  </div>
</template>
