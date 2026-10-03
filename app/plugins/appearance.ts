import { readInitialResolvedAppearance } from '~/lib/readInitialAppearance'

export default defineNuxtPlugin({
  name: 'appearance',
  enforce: 'pre',
  setup() {
    const initialTheme = readInitialResolvedAppearance()

    useHead({
      htmlAttrs: {
        class: initialTheme === 'dark' ? 'dark' : undefined,
        style: `color-scheme: ${initialTheme}`,
      },
    })
  },
})
