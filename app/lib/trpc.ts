import type { AppRouter } from 'my-nuxt-stack/trpc'
import { QueryClient } from '@tanstack/vue-query'
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import superjson from 'superjson'

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        retry: 1,
      },
    },
  })
}

export function createTrpcClient() {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
        transformer: superjson,
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: 'include',
          })
        },
      }),
    ],
  })
}

export type TrpcClient = ReturnType<typeof createTrpcClient>
