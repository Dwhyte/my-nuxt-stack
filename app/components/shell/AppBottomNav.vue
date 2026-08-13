<script setup lang="ts">
import { useDisplay } from "vuetify";

import IconifyIcon from "~/components/IconifyIcon.vue";
import {
  exitSitePreview,
  sitePreviewActive,
} from "~/composables/useSitePreviewMode";

const emit = defineEmits<{
  openNav: [];
  openCreate: [];
}>();

const display = useDisplay();
const route = useRoute();

const isDesktop = computed(() => display.mdAndUp.value);

const showEditSite = computed(
  (): boolean => route.path === "/site" && sitePreviewActive.value,
);

type BottomNavAction =
  | {
      id: string;
      label: string;
      icon: string;
      kind: "menu" | "search" | "create";
    }
  | {
      id: string;
      label: string;
      icon: string;
      kind: "link" | "dashboard";
      to: string;
    };

const actions = computed<BottomNavAction[]>(() => {
  const firstAction: BottomNavAction = isDesktop.value
    ? {
        id: "dashboard",
        label: "Dashboard",
        icon: "solar:home-outline",
        kind: "dashboard",
        to: "/dashboard",
      }
    : { id: "menu", label: "Menu", icon: "lucide:menu", kind: "menu" };

  return [
    firstAction,
    { id: "search", label: "Search", icon: "lucide:search", kind: "search" },
    { id: "new", label: "New", icon: "lucide:plus", kind: "create" },
    {
      id: "example",
      label: "Example",
      icon: "jam:world",
      kind: "link",
      to: "/example",
    },
  ];
});

function isLinkAction(
  action: BottomNavAction,
): action is Extract<BottomNavAction, { kind: "link" | "dashboard" }> {
  return action.kind === "link" || action.kind === "dashboard";
}

function actionClasses(): string {
  return "bottom-nav-action shrink-0 text-white";
}

function onAction(action: BottomNavAction): void {
  if (action.kind === "menu") {
    emit("openNav");
    return;
  }

  if (action.kind === "create") {
    emit("openCreate");
  }
}

function onEditSite(): void {
  exitSitePreview();
}
</script>

<template>
  <nav
    class="pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4"
    style="bottom: max(22px, env(safe-area-inset-bottom, 0px))"
    :aria-label="showEditSite ? 'Exit preview' : 'Quick actions'"
  >
    <div
      data-floating-container-inner
      class="bottom-nav-pill pointer-events-auto relative rounded-[14px] bg-shell-ink px-1.5 py-1.5 shadow-[0_12px_30px_rgba(10,10,11,0.45)]"
    >
      <div
        class="bottom-nav-layer flex items-center gap-1.5 transition-opacity duration-300 ease-out"
        :class="
          showEditSite
            ? 'invisible pointer-events-none opacity-0'
            : 'opacity-100'
        "
        :aria-hidden="showEditSite"
      >
        <template v-for="action in actions" :key="action.id">
          <v-tooltip
            location="top"
            content-class="app-ui-tooltip"
            :disabled="!isDesktop"
            :open-delay="350"
          >
            <template #activator="{ props: tooltipProps }">
              <v-btn
                v-if="isLinkAction(action)"
                v-bind="tooltipProps"
                :to="action.to"
                :icon="action.icon"
                variant="text"
                rounded="lg"
                density="comfortable"
                :class="actionClasses()"
                :aria-label="action.label"
                :tabindex="showEditSite ? -1 : undefined"
              />

              <v-btn
                v-else
                v-bind="tooltipProps"
                :icon="action.icon"
                variant="text"
                rounded="lg"
                density="comfortable"
                :class="actionClasses()"
                :aria-label="action.label"
                :tabindex="showEditSite ? -1 : undefined"
                @click="onAction(action)"
              />
            </template>
            {{ action.label }}
          </v-tooltip>
        </template>
      </div>

      <div
        class="bottom-nav-layer absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-out"
        :class="showEditSite ? 'opacity-100' : 'pointer-events-none opacity-0'"
        :aria-hidden="!showEditSite"
      >
        <button
          type="button"
          class="bottom-nav-edit flex h-10 items-center gap-2 px-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          :tabindex="showEditSite ? 0 : -1"
          @click="onEditSite"
        >
          <IconifyIcon name="fluent:edit-32-regular" class="size-5 shrink-0" />
          Edit site
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.bottom-nav-action.v-btn {
  width: 40px;
  height: 40px;
}

.bottom-nav-action :deep(.v-icon) {
  font-size: 20px;
}

@media (prefers-reduced-motion: reduce) {
  .bottom-nav-pill,
  .bottom-nav-layer {
    transition: none;
  }
}
</style>
