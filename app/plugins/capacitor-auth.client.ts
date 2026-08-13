import { isNativePlatform } from '~/lib/native-platform'

export default defineNuxtPlugin(() => {
  if (!isNativePlatform()) {
    return
  }

  const capacitor = (window as Window & {
    Capacitor?: {
      Plugins?: {
        App?: {
          addListener: (
            event: string,
            handler: (event: { url: string }) => void,
          ) => Promise<{ remove: () => void }>
        }
      }
    }
  }).Capacitor

  const appPlugin = capacitor?.Plugins?.App

  if (!appPlugin) {
    return
  }

  void appPlugin.addListener('appUrlOpen', (event) => {
    try {
      const incoming = new URL(event.url)
      const path = `${incoming.pathname}${incoming.search}`

      if (path.startsWith('/auth/google/callback') || path.startsWith('/auth/magic-link/')) {
        void navigateTo(path)
      }
    } catch {
      // Ignore malformed callback URLs.
    }
  })
})
