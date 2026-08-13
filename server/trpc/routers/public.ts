import { publicProcedure, router } from '../trpc'

export const publicRouter = router({
  status: publicProcedure.query(() => ({
    ok: true as const,
    service: 'my-nuxt-stack',
  })),
})
