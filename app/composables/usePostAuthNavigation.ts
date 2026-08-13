export async function navigateAfterAuth(): Promise<void> {
  await navigateTo('/loading', { replace: true })
}
