<script setup lang="ts">
import { computed, toRef } from "vue";
import {
  getTrendColorClass,
  type TTrendColor,
  getIconColorClass,
  getIcon,
} from "~/constants";

const props = defineProps<{
  title: string;
  amount: number;
  lastAmount: number;
  color: TTrendColor;
  loading: boolean;
}>();

const colorClass = computed(() => getTrendColorClass(props.color));

const isTrendingUp = computed(() => props.amount >= props.lastAmount);

const icon = computed(() =>
  getIcon(
    isTrendingUp.value,
    "i-heroicons-solid-trending-up",
    "i-heroicons-solid-trending-down",
  ),
);

const iconColorClass = computed(() => getIconColorClass(isTrendingUp.value));

const percentageTrend = computed(() => {
  if (props.lastAmount === 0) return "∞%";

  const change = ((props.amount - props.lastAmount) / props.lastAmount) * 100;
  return `${Math.abs(Math.round(change))}%`;
});

const currency = useCurrency(toRef(props, "amount"));
</script>

<template>
  <div>
    <div :class="['font-bold', colorClass]">
      {{ props.title }}
    </div>

    <div class="text-2xl font-extrabold text-black dark:text-white mb-2">
      <USkeleton class="h-8 w-full" v-if="loading" />
      <div v-else>
        {{ currency }}
      </div>
    </div>

    <div>
      <USkeleton class="h-6 w-full" v-if="loading" />
      <div v-else class="flex space-x-1 items-center text-sm">
        <UIcon :name="icon" class="size-6" :class="iconColorClass" />
        <div class="text-gray-500 dark:text-gray-400">
          {{ percentageTrend }} vs last period
        </div>
      </div>
    </div>
  </div>
</template>
