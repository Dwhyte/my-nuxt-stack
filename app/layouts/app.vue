<script setup lang="ts">
import { useDisplay } from 'vuetify'
import MobileBottomSheet from '~/components/adaptive/MobileBottomSheet.vue'
import AppBottomNav from '~/components/shell/AppBottomNav.vue'
import AppDesktopHeader from '~/components/shell/AppDesktopHeader.vue'
import AppSidebarDrawer from '~/components/shell/AppSidebarDrawer.vue'
import { useMe } from '~/features/auth/queries'

useMe()

const drawerOpen = ref(false)
const route = useRoute()
const display = useDisplay()
const { open: sheetOpen, openSheet } = useAppBottomSheet()

const isDesktop = computed(() => display.mdAndUp.value)
const hideBottomNav = computed(() => Boolean(route.meta.hideBottomNav))

watch(
  () => route.path,
  () => {
    document.querySelector('.app-main-canvas')?.scrollTo({ top: 0 })

    if (!isDesktop.value) {
      drawerOpen.value = false
    }
  },
)

function openNav(): void {
  drawerOpen.value = true
}
</script>

<template>
  <v-app class="app-layout h-svh overflow-hidden">
    <AppDesktopHeader v-if="isDesktop" />
    <AppSidebarDrawer v-model="drawerOpen" />
    <v-main class="app-main-canvas h-dvh overflow-auto">
      <div class="min-h-full pb-bottom-nav">
        <slot />
      </div>
    </v-main>
    <AppBottomNav
      v-if="!hideBottomNav"
      @open-nav="openNav"
      @open-create="openSheet"
    />

    <MobileBottomSheet v-if="!isDesktop" v-model:open="sheetOpen" />
  </v-app>
</template>
