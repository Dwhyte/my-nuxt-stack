export function isNativePlatform(): boolean {
  if (import.meta.server) {
    return false
  }

  const capacitor = (window as Window & { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor

  return capacitor?.isNativePlatform?.() === true
}
