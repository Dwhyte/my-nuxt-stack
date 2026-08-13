export function getSiteUrl(): string {
  return (
    process.env.BETTER_AUTH_URL ??
    process.env.NUXT_PUBLIC_SITE_URL ??
    'http://localhost:3000'
  ).replace(/\/$/, '')
}
