<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  title?: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", payload: { description: string }): void;
}>();

const description = ref("");

const onSubmit = () => {
  emit("submit", { description: description.value });
  emit("close");
};
</script>

<template>
  <div class="p-4">
    <div class="text-lg font-semibold mb-3">
      {{ props.title ?? "Add Transaction" }}
    </div>

    <UInput v-model="description" placeholder="Description..." />

    <div class="flex justify-end gap-2 mt-4">
      <UButton variant="soft" @click="emit('close')"> Cancel </UButton>

      <UButton @click="onSubmit">Save</UButton>
    </div>
  </div>
</template>
