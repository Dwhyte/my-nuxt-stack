import type { User } from '@prisma/client'

export type UserProfile = {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  onboardingCompleted: boolean
}

export function toUserProfile(user: User): UserProfile {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.image,
    onboardingCompleted: user.onboardingCompletedAt !== null,
  }
}
