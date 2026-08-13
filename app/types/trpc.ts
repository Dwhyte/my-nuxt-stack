import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from 'my-nuxt-stack/trpc'
import type { QueryClient } from '@tanstack/vue-query'
import type { TrpcClient } from '~/lib/trpc'

type RouterOutputs = inferRouterOutputs<AppRouter>

declare module '#app' {
  interface NuxtApp {
    $trpc: TrpcClient
    $queryClient: QueryClient
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $trpc: TrpcClient
    $queryClient: QueryClient
  }
}

export type AuthUser = RouterOutputs['user']['me']
export type DemoHello = RouterOutputs['demo']['hello']
