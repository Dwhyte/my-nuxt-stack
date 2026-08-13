export type AppNavAction = 'open-menu' | null

export type AppNavItem = {
  key: string
  label: string
  icon: string
  to?: string
  action?: AppNavAction
}

export type AppSideNavItem = {
  key: string
  label: string
  to: string
  icon: string
}

export const appNavItems: AppNavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'solar:home-bold', to: '/dashboard' },
  { key: 'example', label: 'Example', icon: 'solar:folder-outline', to: '/example' },
  { key: 'settings', label: 'Settings', icon: 'solar:settings-linear', to: '/settings' },
  { key: 'menu', label: 'Menu', icon: 'codex:menu', action: 'open-menu' },
]

export const appSideNavItems: AppSideNavItem[] = [
  { key: 'dashboard', label: 'Dashboard', to: '/dashboard', icon: 'solar:home-bold' },
  { key: 'example', label: 'Example', to: '/example', icon: 'solar:folder-outline' },
  { key: 'settings', label: 'Settings', to: '/settings', icon: 'solar:settings-linear' },
]

export function resolveAppSideNavKey(path: string): string | null {
  const current = path.replace(/\/+$/, '') || '/'
  const match = appSideNavItems.find(
    (item) => current === item.to || current.startsWith(`${item.to}/`),
  )
  return match?.key ?? null
}
