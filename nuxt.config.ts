import tailwindcss from '@tailwindcss/vite'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

const packageRoot = dirname(fileURLToPath(import.meta.url))
const certPath = resolve(packageRoot, 'certs/cert.pem')
const keyPath = resolve(packageRoot, 'certs/key.pem')

const isDev = process.env.NODE_ENV !== 'production'
const localHttps =
  isDev && existsSync(certPath) && existsSync(keyPath)
    ? {
        key: keyPath,
        cert: certPath,
      }
    : null

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover',
        },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },

  devtools: {
    enabled: true,
  },

  modules: ['@pinia/nuxt'],

  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css', '~/assets/css/vuetify-overrides.css', 'vuetify/styles'],

  runtimeConfig: {
    betterAuthSecret: process.env.BETTER_AUTH_SECRET ?? '',
    googleClientId: process.env.GOOGLE_CLIENT_ID ?? '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    resendApiKey: process.env.RESEND_API_KEY ?? '',
    resendFromEmail: process.env.RESEND_FROM_EMAIL ?? 'my-nuxt-stack <onboarding@resend.dev>',
    triggerSecretKey: process.env.TRIGGER_SECRET_KEY ?? '',
    triggerProjectRef: process.env.TRIGGER_PROJECT_REF ?? '',
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME ?? 'my-nuxt-stack',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? (localHttps ? 'https://localhost:3000' : 'http://localhost:3000'),
    },
  },

  build: {
    transpile: ['vuetify'],
  },

  routeRules: {
    '/': { ssr: false },
    '/auth/**': { ssr: false },
    '/loading': { ssr: false },
    '/onboarding/**': { ssr: false },
    '/dashboard/**': { ssr: false },
    '/example/**': { ssr: false },
    '/settings/**': { ssr: false },
    '/login': { ssr: false },
    '/**': {
      headers: {
        'Accept-CH': 'Sec-CH-Prefers-Color-Scheme',
        'Critical-CH': 'Sec-CH-Prefers-Color-Scheme',
      },
    },
  },

  devServer: {
    port: 3000,
    ...(localHttps ? { https: localHttps } : {}),
  },

  compatibilityDate: '2026-06-30',

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    server: {
      https: localHttps ?? undefined,
      hmr: localHttps ? { protocol: 'wss' } : undefined,
    },
    plugins: [tailwindcss(), vuetify({ autoImport: true })],
  },
})
