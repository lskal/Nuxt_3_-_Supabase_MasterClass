<script setup lang="ts">
useRedirectIfAuthenticated("/");
</script>

<template>
  <UCard>
    <template #header>Signing in...</template>
    Wait a moment while we sign you in...
  </UCard>
</template>
