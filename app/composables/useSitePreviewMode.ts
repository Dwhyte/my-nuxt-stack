export const sitePreviewActive = ref(false)

export function exitSitePreview(): void {
  if (!sitePreviewActive.value) {
    return
  }

  sitePreviewActive.value = false
}
