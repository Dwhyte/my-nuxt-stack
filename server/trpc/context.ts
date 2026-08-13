import type { H3Event } from 'h3'
import { auth } from '../lib/auth'

export async function createContext(event: H3Event) {
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  return {
    event,
    session: session?.session ?? null,
    user: session?.user ?? null,
    userId: session?.user?.id ?? null,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
