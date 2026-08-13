import { defineConfig } from '@trigger.dev/sdk'

export default defineConfig({
  project: process.env.TRIGGER_PROJECT_REF ?? 'proj_SET_TRIGGER_PROJECT_REF',
  dirs: ['./server/trigger'],
  maxDuration: 3600,
  retries: {
    enabledInDev: false,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10_000,
      factor: 2,
      randomize: true,
    },
  },
  build: {
    external: [
      '@prisma/client',
      '.prisma/client',
    ],
  },
})
