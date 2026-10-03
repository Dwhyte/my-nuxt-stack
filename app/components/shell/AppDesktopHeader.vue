<script setup lang="ts">
import IconifyIcon from '~/components/IconifyIcon.vue'
import {
  showBackFromRoute,
  showBarTitleFromRoute,
} from '~/composables/useAppHeader'
import { appSideNavItems } from '~/constants/appNav'

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const appName = computed(() => config.public.appName as string)

const navTitle = computed(() => {
  if (route.path === '/settings' || route.path.startsWith('/settings/')) {
    return 'Settings'
  }

  const match = appSideNavItems.find(
    (item) =>
      item.to &&
      (route.path === item.to || route.path.startsWith(`${item.to}/`)),
  )
  return match?.label ?? appName.value
})

const showBack = computed(() => showBackFromRoute(route.path, route.meta))
const showBarTitle = computed(() => showBarTitleFromRoute(route.meta))

function handleBack(): void {
  const backTo = route.meta.appHeaderBackTo

  if (backTo) {
    navigateTo(backTo)
    return
  }

  router.back()
}
</script>

<template>
  <header class="surface-chrome-header app-desktop-header shrink-0">
    <div class="flex h-13 w-full items-center gap-2 px-6">
      <div class="flex shrink-0 items-center gap-2">
        <UButton
          v-if="showBack"
          variant="soft"
          color="neutral"
          square
          class="shrink-0 bg-foreground/5"
          aria-label="Go back"
          @click="handleBack"
        >
          <IconifyIcon name="lucide:arrow-left" class="size-[18px]" />
        </UButton>
      </div>

      <div class="flex min-w-0 flex-1 items-center overflow-hidden">
        <nav
          v-if="showBarTitle"
          aria-label="Current page"
          class="flex min-w-0 shrink items-center gap-1.5 text-sm"
        >
          <span class="truncate font-medium text-foreground">{{ navTitle }}</span>
        </nav>
      </div>

      <div class="flex shrink-0 items-center gap-2">
        <UButton
          variant="ghost"
          color="neutral"
          square
          class="shrink-0 bg-muted/40"
          aria-label="Settings"
          to="/settings"
        >
          <IconifyIcon name="solar:settings-linear" class="size-[18px]" />
        </UButton>
      </div>
    </div>
  </header>
</template>

<style scoped>
.h-13 {
  height: 3.25rem;
}
</style>
