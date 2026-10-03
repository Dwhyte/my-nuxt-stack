<script setup lang="ts">
import AppLoadingSpinner from '~/components/AppLoadingSpinner.vue'

await navigateTo('/loading', { replace: true })
</script>

<template>
  <div class="flex min-h-dvh items-center justify-center">
    <AppLoadingSpinner />
  </div>
</template>
