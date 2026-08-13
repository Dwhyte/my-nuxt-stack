import { z } from 'zod'

export const CompleteNameInputSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
})

export type CompleteNameInput = z.infer<typeof CompleteNameInputSchema>
