<script setup lang="ts">
import IconifyIcon from '~/components/IconifyIcon.vue'
import { appSideNavItems } from '~/constants/appNav'

const DRAWER_WIDTH_DESKTOP = 227
const RAIL_WIDTH = 52

const drawerOpen = defineModel<boolean>({ default: false })

const route = useRoute()
const { isDesktop } = useAppDisplay()
const config = useRuntimeConfig()
const appName = computed(() => config.public.appName as string)
const appInitial = computed(() => appName.value.charAt(0).toUpperCase() || 'A')

const railExpanded = ref(false)

interface ResolvedNavChild {
  key: string
  label: string
  link: string
  active: boolean
  disabled: boolean
  badge: string | null
}

interface ResolvedNavItem {
  key: string
  label: string
  icon?: string
  link: string
  action: string | null
  active: boolean
  disabled: boolean
  badge: string | null
  children: ResolvedNavChild[]
}

const navItems = computed<ResolvedNavItem[]>(() => {
  const current = route.path.replace(/\/+$/, '') || '/'

  const isActive = (to: string): boolean => {
    const target = to.replace(/\/+$/, '') || '/'

    return current === target || current.startsWith(`${target}/`)
  }

  return appSideNavItems.map((item) => ({
    key: item.key,
    label: item.label,
    icon: item.icon,
    link: item.to ?? '',
    action: item.action ?? null,
    active: item.action ? false : isActive(item.to ?? ''),
    disabled: false,
    badge: null,
    children: [],
  }))
})

const settingsNavActive = computed(() => {
  const current = route.path.replace(/\/+$/, '') || '/'

  return current === '/settings' || current.startsWith('/settings/')
})

const showLabels = computed(() => !isDesktop.value || railExpanded.value)

watch(
  isDesktop,
  (desktop) => {
    drawerOpen.value = desktop
  },
  { immediate: true },
)

function navItemClass(active: boolean, disabled: boolean, extra = '', spacedOnMobile = false): string {
  const classes = ['side-nav-item', 'flex items-center gap-2 rounded-lg px-2 py-2 no-underline transition-colors', extra].filter(Boolean)

  if (spacedOnMobile && !isDesktop.value) {
    classes.push('mb-[0.7rem]')
  }

  if (active && !disabled) {
    classes.push('side-nav-item--active')
  } else if (!active && !disabled) {
    classes.push('side-nav-item--inactive')
  }

  return classes.join(' ')
}

const navIconSizeClass = computed(() => (isDesktop.value ? 'size-[18px]' : 'size-[22px]'))

function navTitleClass(gap: 'gap-2' | 'gap-4' = 'gap-4'): string {
  return [
    'flex min-w-0 items-center',
    gap,
    isDesktop.value ? 'text-sm font-medium' : 'text-lg font-medium',
  ].join(' ')
}

function openSettings(): void {
  drawerOpen.value = false
  navigateTo('/settings')
}

function onNavAction(): void {
  drawerOpen.value = false
}

const desktopWidth = computed(() => (railExpanded.value ? DRAWER_WIDTH_DESKTOP : RAIL_WIDTH))
</script>

<template>
  <aside
    v-if="isDesktop"
    class="surface-chrome-sidebar hidden shrink-0 flex-col overflow-hidden transition-[width] duration-200 ease-out md:flex"
    :style="{ width: `${desktopWidth}px` }"
    @mouseenter="railExpanded = true"
    @mouseleave="railExpanded = false"
  >
    <div class="flex items-center px-2 py-3">
      <NuxtLink
        to="/dashboard"
        class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground no-underline"
        :aria-label="`${appName} home`"
      >
        <span class="font-display text-sm font-extrabold">{{ appInitial }}</span>
      </NuxtLink>
    </div>

    <nav class="flex flex-1 flex-col gap-0.5 px-2" aria-label="Main">
      <template v-for="item in navItems" :key="item.key">
        <button
          v-if="item.action"
          type="button"
          :class="navItemClass(false, item.disabled, 'w-full text-left', true)"
          @click="onNavAction"
        >
          <span :class="navTitleClass()">
            <IconifyIcon
              v-if="item.icon"
              :name="item.icon"
              class="side-nav-item__icon shrink-0"
              :class="navIconSizeClass"
            />
            <span
              v-show="showLabels"
              class="truncate"
            >{{ item.label }}</span>
            <span v-if="item.badge && showLabels" class="ms-1 text-muted-foreground/60">{{ item.badge }}</span>
          </span>
        </button>

        <NuxtLink
          v-else
          :to="item.disabled ? undefined : item.link"
          :class="navItemClass(item.active, item.disabled, '', true)"
        >
          <span :class="navTitleClass()">
            <IconifyIcon
              v-if="item.icon"
              :name="item.icon"
              class="side-nav-item__icon shrink-0"
              :class="navIconSizeClass"
            />
            <span
              v-show="showLabels"
              class="truncate"
            >{{ item.label }}</span>
            <span v-if="item.badge && showLabels" class="ms-1 text-muted-foreground/60">{{ item.badge }}</span>
          </span>
        </NuxtLink>
      </template>
    </nav>

    <div class="mt-auto border-t border-border px-2 pb-2 pt-1">
      <NuxtLink
        to="/settings"
        :class="navItemClass(settingsNavActive, false)"
      >
        <span :class="navTitleClass()">
          <IconifyIcon name="solar:settings-linear" class="side-nav-item__icon shrink-0" :class="navIconSizeClass" />
          <span v-show="showLabels" class="truncate">Settings</span>
        </span>
      </NuxtLink>
    </div>
  </aside>

  <USlideover
    v-else
    v-model:open="drawerOpen"
    side="left"
    :ui="{ content: 'surface-chrome-sidebar w-[300px] max-w-[85vw]' }"
  >
    <template #body>
      <div class="flex h-full flex-col">
        <div class="flex items-center px-2 py-3">
          <NuxtLink
            to="/dashboard"
            class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground no-underline"
            :aria-label="`${appName} home`"
            @click="drawerOpen = false"
          >
            <span class="font-display text-sm font-extrabold">{{ appInitial }}</span>
          </NuxtLink>
        </div>

        <nav class="flex flex-1 flex-col gap-0.5 px-2" aria-label="Main">
          <template v-for="item in navItems" :key="item.key">
            <button
              v-if="item.action"
              type="button"
              :class="navItemClass(false, item.disabled, 'w-full text-left', true)"
              @click="onNavAction"
            >
              <span :class="navTitleClass()">
                <IconifyIcon
                  v-if="item.icon"
                  :name="item.icon"
                  class="side-nav-item__icon shrink-0"
                  :class="navIconSizeClass"
                />
                <span class="truncate">{{ item.label }}</span>
              </span>
            </button>

            <NuxtLink
              v-else
              :to="item.disabled ? undefined : item.link"
              :class="navItemClass(item.active, item.disabled, '', true)"
              @click="drawerOpen = false"
            >
              <span :class="navTitleClass()">
                <IconifyIcon
                  v-if="item.icon"
                  :name="item.icon"
                  class="side-nav-item__icon shrink-0"
                  :class="navIconSizeClass"
                />
                <span class="truncate">{{ item.label }}</span>
              </span>
            </NuxtLink>
          </template>
        </nav>

        <div class="mt-auto border-t border-border px-2 pb-2 pt-1">
          <button
            type="button"
            :class="navItemClass(settingsNavActive, false, 'w-full text-left')"
            @click="openSettings"
          >
            <span :class="navTitleClass()">
              <IconifyIcon name="solar:settings-linear" class="side-nav-item__icon shrink-0" :class="navIconSizeClass" />
              <span class="truncate">Settings</span>
            </span>
          </button>
        </div>
      </div>
    </template>
  </USlideover>
</template>
