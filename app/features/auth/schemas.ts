import { z } from 'zod'

export const loginEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Enter your email address.' })
    .email({ message: 'Enter a valid email address.' })
    .max(255, { message: 'Email must be 255 characters or fewer.' }),
})

export type LoginEmailValues = z.infer<typeof loginEmailSchema>

export function validateLoginEmail(email: string): string | true {
  const result = loginEmailSchema.safeParse({ email })

  if (!result.success) {
    return result.error.issues[0]?.message ?? 'Enter a valid email address.'
  }

  return true
}
