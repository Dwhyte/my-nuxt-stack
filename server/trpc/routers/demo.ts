import { tasks } from '@trigger.dev/sdk'
import { publicProcedure, protectedProcedure, router } from '../trpc'
import { withTrpcError } from '../mapServiceError'

export const demoRouter = router({
  hello: publicProcedure.query(() => ({
    message: 'Hello from tRPC!',
    timestamp: new Date().toISOString(),
  })),

  triggerHealthCheck: protectedProcedure.mutation(() =>
    withTrpcError(async () => {
      const handle = await tasks.trigger('health-check', {})
      return {
        runId: handle.id,
        message: 'Health check task queued',
      }
    }),
  ),
})
