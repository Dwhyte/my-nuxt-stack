import { logger, task } from '@trigger.dev/sdk'

export const healthCheckTask = task({
  id: 'health-check',
  run: async () => {
    logger.info('my-nuxt-stack Trigger worker is healthy')
    return { ok: true as const, checkedAt: new Date().toISOString() }
  },
})
