import type { AuthUser } from '~/types/trpc'

export async function fetchCurrentUser(): Promise<AuthUser | null> {
  const { $trpc } = useNuxtApp()

  try {
    return await $trpc.user.me.query()
  } catch {
    return null
  }
}
