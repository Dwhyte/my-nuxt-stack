<script setup lang="ts">
withDefaults(
  defineProps<{
    disabled?: boolean
    loading?: boolean
    type?: 'button' | 'submit'
    block?: boolean
    href?: string
    to?: string
  }>(),
  {
    type: 'button',
    block: true,
  },
)
</script>

<template>
  <UButton
    size="lg"
    :block="block"
    :type="href || to ? undefined : type"
    :href="href"
    :to="to"
    :disabled="disabled"
    :loading="loading"
  >
    <slot />
  </UButton>
</template>
