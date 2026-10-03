<script setup lang="ts">
import MobileBottomSheet, { type BottomSheetSize } from '~/components/adaptive/MobileBottomSheet.vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    size?: BottomSheetSize
  }>(),
  {
    title: '',
    size: null,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { mdAndUp } = useAppDisplay()

const open = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

const isFullscreenDialog = computed(() => props.size === 'full')

const mobileBodyClass = computed(() =>
  props.size === null
    ? 'flex flex-col overflow-hidden px-4 pb-6 pt-2'
    : 'flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-6 pt-2',
)

const modalContentClass = computed(() => {
  if (isFullscreenDialog.value) {
    return 'rounded-none max-w-none'
  }

  if (props.size === 'large') {
    return 'max-w-[560px]'
  }

  return 'max-w-[480px]'
})
</script>

<template>
  <MobileBottomSheet
    v-if="!mdAndUp"
    v-model:open="open"
    :size="size"
  >
    <div :class="mobileBodyClass">
      <p v-if="title" class="mb-4 font-display text-lg font-extrabold">
        {{ title }}
      </p>
      <slot />
    </div>
  </MobileBottomSheet>

  <UModal
    v-else
    v-model:open="open"
    :fullscreen="isFullscreenDialog"
    :title="title || undefined"
    :ui="{ content: modalContentClass }"
  >
    <template #body>
      <slot />
    </template>
  </UModal>
</template>
