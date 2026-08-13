<script setup lang="ts">
</script>

<template>
  <v-app class="auth-layout bg-[var(--auth-surface)]">
    <v-main class="flex min-h-dvh items-center justify-center bg-[var(--auth-surface)]">
      <slot />
    </v-main>
  </v-app>
</template>

<style scoped>
.auth-layout {
  color: var(--auth-ink);
}
</style>
