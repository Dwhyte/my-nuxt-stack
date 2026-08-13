<script setup lang="ts">
import AuthFormPage from '~/components/auth/AuthFormPage.vue'

definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
})
</script>

<template>
  <AuthFormPage mode="login" />
</template>
