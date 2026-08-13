import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { magicLink } from 'better-auth/plugins'
import { Resend } from 'resend'
import { prisma } from './prisma'
import { getSiteUrl } from './env'

function createResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return null
  }
  return new Resend(apiKey)
}

const appName = process.env.NUXT_PUBLIC_APP_NAME ?? 'my-nuxt-stack'

export const auth = betterAuth({
  baseURL: getSiteUrl(),
  secret: process.env.BETTER_AUTH_SECRET ?? 'dev-secret-change-me',
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  user: {
    additionalFields: {
      onboardingCompletedAt: { type: 'date', required: false },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      enabled: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        const resend = createResend()
        if (!resend) {
          console.info(`[dev] Magic link for ${email}: ${url}`)
          return
        }

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? `${appName} <onboarding@resend.dev>`,
          to: email,
          subject: `Sign in to ${appName}`,
          html: `<p>Click to sign in:</p><p><a href="${url}">${url}</a></p>`,
        })
      },
    }),
  ],
})

export type AuthSession = typeof auth.$Infer.Session
