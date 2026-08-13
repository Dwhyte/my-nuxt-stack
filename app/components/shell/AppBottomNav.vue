<script setup lang="ts">
import { useDisplay } from 'vuetify'
import IconifyIcon from '~/components/IconifyIcon.vue'
import { appNavItems } from '~/constants/appNav'

const emit = defineEmits<{
  openNav: []
}>()

const display = useDisplay()
const isDesktop = computed(() => display.mdAndUp.value)

function actionClasses(): string {
  return 'bottom-nav-action shrink-0 text-white'
}

function onItemClick(item: (typeof appNavItems)[number]): void {
  if (item.action === 'open-menu') {
    emit('openNav')
  }
}
</script>

<template>
  <nav
    class="pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4"
    style="bottom: max(22px, env(safe-area-inset-bottom, 0px))"
    aria-label="Quick actions"
  >
    <div
      data-floating-container-inner
      class="bottom-nav-pill pointer-events-auto relative rounded-[14px] bg-shell-ink px-1.5 py-1.5 shadow-[0_12px_30px_rgba(10,10,11,0.45)]"
    >
      <div class="bottom-nav-layer flex items-center gap-1.5 opacity-100">
        <template v-for="item in appNavItems" :key="item.key">
          <v-tooltip
            location="top"
            content-class="app-ui-tooltip"
            :disabled="!isDesktop"
            :open-delay="350"
          >
            <template #activator="{ props: tooltipProps }">
              <v-btn
                v-if="item.to"
                v-bind="tooltipProps"
                :to="item.to"
                variant="text"
                rounded="lg"
                density="comfortable"
                :class="actionClasses()"
                :aria-label="item.label"
              >
                <IconifyIcon :name="item.icon" class="size-5" />
              </v-btn>

              <v-btn
                v-else
                v-bind="tooltipProps"
                variant="text"
                rounded="lg"
                density="comfortable"
                :class="actionClasses()"
                :aria-label="item.label"
                @click="onItemClick(item)"
              >
                <IconifyIcon :name="item.icon" class="size-5" />
              </v-btn>
            </template>
            {{ item.label }}
          </v-tooltip>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.bottom-nav-action.v-btn {
  width: 40px;
  height: 40px;
}

@media (prefers-reduced-motion: reduce) {
  .bottom-nav-pill,
  .bottom-nav-layer {
    transition: none;
  }
}
</style>
