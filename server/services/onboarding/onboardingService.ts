import { prisma } from '../../lib/prisma'
import { ServiceError } from '../../lib/ServiceError'

export async function getUserById(userId: string) {
  return prisma.user.findUnique({ where: { id: userId } })
}

export async function completeOnboardingName(userId: string, name: string) {
  const trimmed = name.trim()

  if (!trimmed) {
    throw new ServiceError('BAD_USER_INPUT', 'Name is required.')
  }

  return prisma.user.update({
    where: { id: userId },
    data: {
      name: trimmed,
      onboardingCompletedAt: new Date(),
    },
  })
}
