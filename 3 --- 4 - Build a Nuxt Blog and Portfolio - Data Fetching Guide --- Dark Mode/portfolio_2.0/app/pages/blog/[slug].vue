<script setup>
const route = useRoute();

console.log(route.params.slug);
</script>

<template>
  <p>you've successfully reach this page</p>
  <p>post id is: {{ route.params.slug }}</p>
</template>
