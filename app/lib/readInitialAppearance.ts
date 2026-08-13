import {
  APPEARANCE_COOKIE,
  parseAppearance,
  readSystemPrefersDarkFromHeaders,
  readSystemPrefersDarkFromWindow,
  resolveAppearance,
  syncAppearanceStorageToCookie,
  type ResolvedAppearance,
} from '~/lib/appearanceResolve'

export function readInitialResolvedAppearance(): ResolvedAppearance {
  const appearanceCookie = useCookie<string | null>(APPEARANCE_COOKIE)

  const appearance = import.meta.client ? syncAppearanceStorageToCookie(appearanceCookie) : parseAppearance(appearanceCookie.value)

  const systemPrefersDark = import.meta.server ? readSystemPrefersDarkFromHeaders(useRequestHeaders(['sec-ch-prefers-color-scheme'])) : readSystemPrefersDarkFromWindow()

  return resolveAppearance(appearance, systemPrefersDark)
}
