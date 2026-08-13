import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import {
  resolveLandingRoute,
  resolvePostAuthDestination,
  toLandingRouteUserFromAuth,
} from '~/features/onboarding/resolveLandingRoute'
import { authClient } from '~/lib/auth-client'
import type { AuthUser } from '~/types/trpc'

export function useMe() {
  const { $trpc } = useNuxtApp()

  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => $trpc.user.me.query(),
    retry: false,
  })
}

export function useSendMagicLink() {
  const { $trpc } = useNuxtApp()

  const mutation = useMutation({
    mutationFn: (input: { email: string; name?: string }) =>
      $trpc.auth.sendMagicLink.mutate(input),
  })

  async function send(email: string, name?: string): Promise<void> {
    await mutation.mutateAsync({ email, name })
  }

  return {
    send,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}

export function useVerifyMagicLink() {
  const queryClient = useQueryClient()
  const { $trpc } = useNuxtApp()

  const mutation = useMutation({
    mutationFn: (token: string) => $trpc.auth.verifyMagicLink.mutate({ token }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
    },
  })

  return {
    verify: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}

export function useInitiateGoogleOAuth() {
  const isPending = ref(false)
  const error = ref<Error | null>(null)

  async function open(): Promise<void> {
    isPending.value = true
    error.value = null

    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/auth/google/callback',
      })
    } catch (err) {
      error.value =
        err instanceof Error
          ? err
          : new Error('Unable to start Google sign-in.')
      throw error.value
    } finally {
      isPending.value = false
    }
  }

  return {
    open,
    isPending,
    error,
  }
}

export function useCompleteName() {
  const queryClient = useQueryClient()
  const { $trpc } = useNuxtApp()

  return useMutation({
    mutationFn: (name: string) => $trpc.account.completeName.mutate({ name }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const { $trpc } = useNuxtApp()

  const mutation = useMutation({
    mutationFn: () => $trpc.auth.logout.mutate(undefined),
    onSettled: async () => {
      await queryClient.clear()
      await navigateTo('/login')
    },
  })

  return {
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}

export function resolvePostAuthRoute(user: AuthUser): string {
  return resolveLandingRoute(toLandingRouteUserFromAuth(user))
}

export function resolvePostAuthDestinationForUser(
  user: AuthUser,
  storedRedirect?: string | null,
  queryRedirect?: string | null,
): string {
  return resolvePostAuthDestination(
    toLandingRouteUserFromAuth(user),
    storedRedirect,
    queryRedirect,
  )
}

export async function finalizeAuthSession(): Promise<AuthUser | null> {
  const { $trpc } = useNuxtApp()
  const queryClient = useQueryClient()

  await queryClient.invalidateQueries({ queryKey: ['user', 'me'] })

  try {
    return await $trpc.user.me.query()
  } catch {
    return null
  }
}
