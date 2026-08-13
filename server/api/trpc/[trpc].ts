import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '../../trpc/routers/_app'
import { createContext } from '../../trpc/context'

export default defineEventHandler((event) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: toWebRequest(event),
    router: appRouter,
    createContext: () => createContext(event),
  })
})
