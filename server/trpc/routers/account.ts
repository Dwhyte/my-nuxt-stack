import { CompleteNameInputSchema } from '../../schemas/account'
import { completeOnboardingName } from '../../services/onboarding/onboardingService'
import { toUserProfile } from '../../lib/userProfile'
import { withTrpcError } from '../mapServiceError'
import { protectedProcedure, router } from '../trpc'

export const accountRouter = router({
  completeName: protectedProcedure.input(CompleteNameInputSchema).mutation(({ ctx, input }) =>
    withTrpcError(async () => {
      const user = await completeOnboardingName(ctx.userId, input.name)
      return toUserProfile(user)
    }),
  ),
})
