import {
  SendMagicLinkInputSchema,
  VerifyMagicLinkInputSchema,
} from '../../schemas/auth'
import { auth } from '../../lib/auth'
import { getSiteUrl } from '../../lib/env'
import { withTrpcError } from '../mapServiceError'
import { protectedProcedure, publicProcedure, router } from '../trpc'

export const authRouter = router({
  sendMagicLink: publicProcedure.input(SendMagicLinkInputSchema).mutation(({ ctx, input }) =>
    withTrpcError(async () => {
      await auth.api.signInMagicLink({
        body: {
          email: input.email,
          name: input.name,
          callbackURL: `${getSiteUrl()}/auth/magic-link/complete`,
        },
        headers: ctx.event.headers,
      })

      return { success: true as const }
    }),
  ),

  verifyMagicLink: publicProcedure.input(VerifyMagicLinkInputSchema).mutation(({ ctx, input }) =>
    withTrpcError(async () => {
      const verifyUrl = new URL('/api/auth/magic-link/verify', getSiteUrl())
      verifyUrl.searchParams.set('token', input.token)
      verifyUrl.searchParams.set('callbackURL', `${getSiteUrl()}/loading`)

      const request = new Request(verifyUrl.toString(), {
        method: 'GET',
        headers: ctx.event.headers,
      })

      const response = await auth.handler(request)

      if (!response.ok) {
        throw new Error('Unable to verify sign-in link.')
      }

      return { success: true as const }
    }),
  ),

  logout: protectedProcedure.mutation(({ ctx }) =>
    withTrpcError(async () => {
      await auth.api.signOut({
        headers: ctx.event.headers,
      })

      return {
        success: true as const,
        message: 'Signed out.',
      }
    }),
  ),
})
