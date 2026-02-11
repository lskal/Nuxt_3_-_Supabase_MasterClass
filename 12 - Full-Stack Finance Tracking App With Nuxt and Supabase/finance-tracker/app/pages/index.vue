<script setup>
import { transactionalViewOptions } from "~/constants";
const viewSelect = ref(transactionalViewOptions[1]);
</script>

<template>
  <section class="flex items-center justify-between mb-10">
    <h1 class="text-4xl font-extrabold">Summary</h1>
    <div>
      <USelectMenu :items="transactionalViewOptions" v-model="viewSelect" />
    </div>
  </section>
</template>
