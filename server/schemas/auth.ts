import { z } from 'zod'

export const SendMagicLinkInputSchema = z.object({
  email: z.email(),
  name: z.string().trim().min(1).optional(),
})

export const VerifyMagicLinkInputSchema = z.object({
  token: z.string().min(1),
})

export type SendMagicLinkInput = z.infer<typeof SendMagicLinkInputSchema>
export type VerifyMagicLinkInput = z.infer<typeof VerifyMagicLinkInputSchema>
