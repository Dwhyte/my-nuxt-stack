import { createAuthClient } from 'better-auth/client'
import { magicLinkClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  plugins: [magicLinkClient()],
})

export async function getAuthSession() {
  const { data } = await authClient.getSession()
  return data
}

export async function isAuthenticatedSession(): Promise<boolean> {
  const session = await getAuthSession()
  return Boolean(session?.session)
}
