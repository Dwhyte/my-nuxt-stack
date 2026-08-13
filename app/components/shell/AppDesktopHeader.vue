<script setup lang="ts">
import IconifyIcon from '~/components/IconifyIcon.vue'
import { showBackFromRoute, showBarTitleFromRoute } from '~/composables/useAppHeader'
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
    (item) => item.to && (route.path === item.to || route.path.startsWith(`${item.to}/`)),
  )
  return match?.label ?? appName.value
})

const showBack = computed(() => showBackFromRoute(route.path, route.meta))
const showBarTitle = computed(() => showBarTitleFromRoute(route.meta))
const appInitial = computed(() => appName.value.charAt(0).toUpperCase() || 'A')

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
  <v-app-bar
    flat
    density="compact"
    order="2"
    color="white"
    class="surface-chrome-header app-desktop-header"
    elevation="0"
  >
    <div class="flex h-13 w-full items-center gap-2 px-6">
      <div class="flex shrink-0 items-center gap-2">
        <NuxtLink
          to="/dashboard"
          class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
          :aria-label="`${appName} home`"
        >
          <span class="font-display text-sm font-extrabold">{{ appInitial }}</span>
        </NuxtLink>

        <v-btn
          v-if="showBack"
          icon
          variant="tonal"
          rounded="lg"
          density="comfortable"
          class="shrink-0 bg-foreground/5"
          aria-label="Go back"
          @click="handleBack"
        >
          <v-icon icon="lucide:arrow-left" size="18" />
        </v-btn>
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
        <v-btn
          icon
          variant="text"
          rounded="lg"
          density="comfortable"
          class="shrink-0 bg-muted/40"
          aria-label="Settings"
          to="/settings"
        >
          <IconifyIcon name="solar:settings-linear" class="size-[18px]" />
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<style scoped>
.h-13 {
  height: 3.25rem;
}
</style>
