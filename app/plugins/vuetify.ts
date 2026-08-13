import { createVuetify } from 'vuetify'
import { readInitialResolvedAppearance } from '~/lib/readInitialAppearance'
import iconify from '~/lib/vuetify-icons'
import { readVuetifyThemeColors, vuetifyDarkThemeColors, vuetifyLightThemeColors } from '~/theme/tokens'
import type { ResolvedAppearance } from '~/lib/appearanceResolve'

export function createAppVuetify(initialTheme: ResolvedAppearance) {
  const lightColors = import.meta.server ? vuetifyLightThemeColors() : readVuetifyThemeColors('light')
  const darkColors = import.meta.server ? vuetifyDarkThemeColors() : readVuetifyThemeColors('dark')

  return createVuetify({
    ssr: import.meta.env.SSR,
    defaults: {
      VBtn: {
        rounded: 'lg',
      },
      VCard: {
        rounded: 'lg',
        variant: 'flat',
      },
    },
    icons: {
      defaultSet: 'iconify',
      sets: {
        iconify,
      },
    },
    theme: {
      defaultTheme: initialTheme,
      themes: {
        light: {
          colors: lightColors,
        },
        dark: {
          colors: darkColors,
        },
      },
    },
    display: {
      mobileBreakpoint: 'md',
      thresholds: {
        xs: 0,
        sm: 600,
        md: 840,
        lg: 1145,
        xl: 1545,
        xxl: 2138,
      },
    },
  })
}

export default defineNuxtPlugin({
  name: 'vuetify',
  enforce: 'pre',
  setup(nuxtApp) {
    const initialTheme = readInitialResolvedAppearance()

    useHead({
      htmlAttrs: {
        class: initialTheme === 'dark' ? 'dark' : undefined,
        style: `color-scheme: ${initialTheme}`,
      },
    })

    nuxtApp.vueApp.use(createAppVuetify(initialTheme))
  },
})
