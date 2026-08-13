import type { RouteMeta } from 'vue-router'
import type { AppHeaderMode } from '~/types/app-shell'

export function resolveAppHeaderMode(meta: {
  appHeaderMode?: AppHeaderMode
  hideAppHeaderTitle?: boolean
}): AppHeaderMode {
  if (meta.appHeaderMode) {
    return meta.appHeaderMode
  }

  return meta.hideAppHeaderTitle === true ? 'hub' : 'bar'
}

function pathDepthFor(path: string): number {
  return path.split('/').filter(Boolean).length
}

export function showBackFromRoute(path: string, meta: RouteMeta): boolean {
  const mode = resolveAppHeaderMode(meta)

  if (mode === 'stack') {
    return true
  }

  return mode === 'bar' && pathDepthFor(path) > 1
}

export function showBarTitleFromRoute(meta: RouteMeta): boolean {
  return resolveAppHeaderMode(meta) !== 'hub'
}
