<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    showBack?: boolean;
    backTo?: string;
    showTrailing?: boolean;
    onBack?: (() => void) | null;
  }>(),
  {
    showBack: false,
    showTrailing: true,
    onBack: null,
  },
);

const router = useRouter()

function handleBack(): void {
  if (typeof props.onBack === "function") {
    props.onBack();
    return;
  }

  if (props.backTo) {
    navigateTo(props.backTo);
    return;
  }

  router.back();
}
</script>

<template>
  <header
    class="app-mobile-header surface-chrome-header sticky top-0 z-10 pt-safe-header md:hidden"
  >
    <div class="flex min-h-12 w-full items-center gap-2 px-4 pb-2 md:px-6">
      <div
        class="app-mobile-header__leading flex size-12 shrink-0 items-center justify-center"
        :class="{ 'pointer-events-none invisible': !showBack }"
      >
        <v-btn
          icon
          variant="tonal"
          rounded="lg"
          density="comfortable"
          class="shrink-0 bg-foreground/5 -ml-1"
          aria-label="Go back"
          @click="handleBack"
        >
          <v-icon icon="lucide:arrow-left" size="24" />
        </v-btn>
      </div>

      <div class="min-w-0 flex-1" />

      <div v-if="$slots.trailing" class="flex shrink-0 items-center gap-1.5">
        <slot name="trailing" />
      </div>
    </div>
  </header>
</template>
