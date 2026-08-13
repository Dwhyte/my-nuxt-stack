import { createTrpcClient } from '~/lib/trpc'

export default defineNuxtPlugin(() => {
  const trpc = createTrpcClient()

  return {
    provide: {
      trpc,
    },
  }
})
