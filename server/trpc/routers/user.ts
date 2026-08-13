import { getUserById } from '../../services/onboarding/onboardingService'
import { toUserProfile } from '../../lib/userProfile'
import { withTrpcError } from '../mapServiceError'
import { protectedProcedure, router } from '../trpc'

export const userRouter = router({
  me: protectedProcedure.query(({ ctx }) =>
    withTrpcError(async () => {
      const user = await getUserById(ctx.userId)
      if (!user) {
        throw new Error('User not found.')
      }
      return toUserProfile(user)
    }),
  ),
})
