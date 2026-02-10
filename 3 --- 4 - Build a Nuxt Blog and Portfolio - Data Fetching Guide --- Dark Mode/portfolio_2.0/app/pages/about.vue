<script setup>
useHead({
  title: "About",
});

const enableCustomLayout = () => setPageLayout("another");
</script>

<template>
  <div>this page is about me</div>
  <button class="underline" @click="enableCustomLayout">change layout!</button>
</template>
