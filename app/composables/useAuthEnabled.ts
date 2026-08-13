import { computed } from 'vue'
import { useMe } from '~/features/auth/mutations'

export function useAuthEnabled() {
  const { data } = useMe()

  return computed(() => Boolean(data.value))
}

export function useIsAuthenticated() {
  return useAuthEnabled()
}
