export type AppNavAction = "open-menu" | null;

export type AppNavItem = {
  key: string;
  label: string;
  icon: string;
  to?: string;
  action?: AppNavAction;
};

export type AppSideNavAction = string;

export type AppSideNavItem = {
  key: string;
  label: string;
  to?: string;
  icon: string;
  action?: AppSideNavAction;
};

export const appNavItems: AppNavItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: "solar:home-bold-duotone",
    to: "/dashboard",
  },
  {
    key: "example",
    label: "Example",
    icon: "iconamoon:folder-duotone",
    to: "/example",
  },
  {
    key: "settings",
    label: "Settings",
    icon: "solar:settings-linear",
    to: "/settings",
  },
  { key: "menu", label: "Menu", icon: "codex:menu", action: "open-menu" },
];

export const appSideNavItems: AppSideNavItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    to: "/dashboard",
    icon: "solar:home-bold-duotone",
  },
  {
    key: "example",
    label: "Example",
    to: "/example",
    icon: "iconamoon:folder-duotone",
  },
];

export function resolveAppSideNavKey(path: string): string | null {
  const current = path.replace(/\/+$/, "") || "/";
  const match = appSideNavItems.find(
    (item) =>
      item.to && (current === item.to || current.startsWith(`${item.to}/`)),
  );
  return match?.key ?? null;
}
