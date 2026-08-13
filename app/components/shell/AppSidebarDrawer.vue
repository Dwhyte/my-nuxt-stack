<script setup lang="ts">
import { useDisplay } from 'vuetify'
import IconifyIcon from '~/components/IconifyIcon.vue'
import { appSideNavItems } from '~/constants/appNav'

const DRAWER_WIDTH = computed(() => isDesktop.value ? 227 : 300)
const RAIL_WIDTH = 52

const drawerOpen = defineModel<boolean>({ default: false })

const route = useRoute()
const display = useDisplay()
const isDesktop = computed(() => display.mdAndUp.value)
const config = useRuntimeConfig()
const appName = computed(() => config.public.appName as string)
const appInitial = computed(() => appName.value.charAt(0).toUpperCase() || 'A')

const navItems = computed(() => {
  const current = route.path.replace(/\/+$/, '') || '/'

  const isActive = (to: string): boolean => {
    const target = to.replace(/\/+$/, '') || '/'
    return current === target || current.startsWith(`${target}/`)
  }

  return appSideNavItems.map((item) => ({
    ...item,
    active: isActive(item.to),
  }))
})

watch(
  isDesktop,
  (desktop) => {
    drawerOpen.value = desktop
  },
  { immediate: true },
)

function navItemClass(active: boolean, extra = '', spacedOnMobile = false): string {
  const classes = ['side-nav-item', 'rounded-lg', extra].filter(Boolean)

  if (spacedOnMobile && !isDesktop.value) {
    classes.push('mb-[0.7rem]')
  }

  if (!active) {
    classes.push('side-nav-item--inactive')
  }

  return classes.join(' ')
}

const navIconSize = computed(() => (isDesktop.value ? 18 : 22))

function navTitleClass(gap: 'gap-2' | 'gap-4' = 'gap-4'): string {
  return [
    'flex items-center',
    gap,
    isDesktop.value ? 'text-sm font-medium' : '!text-lg font-medium',
  ].join(' ')
}
</script>

<template>
  <v-navigation-drawer
    v-model="drawerOpen"
    order="0"
    class="surface-chrome-sidebar"
    :width="DRAWER_WIDTH"
    :temporary="!isDesktop"
    :rail="isDesktop"
    :rail-width="RAIL_WIDTH"
    :expand-on-hover="isDesktop"
  >
    <template #prepend>
      <div class="flex items-center px-2 py-3">
        <NuxtLink
          to="/dashboard"
          class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
          :aria-label="`${appName} home`"
        >
          <span class="font-display text-sm font-extrabold">{{ appInitial }}</span>
        </NuxtLink>
      </div>
    </template>

    <v-list nav :lines="false">
      <v-list-item
        v-for="item in navItems"
        :key="item.key"
        link
        :to="item.to"
        :active="item.active"
        :class="navItemClass(item.active, '', true)"
      >
        <v-list-item-title :class="navTitleClass()">
          <IconifyIcon :name="item.icon" :style="{ width: `${navIconSize}px`, height: `${navIconSize}px` }" />
          {{ item.label }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
