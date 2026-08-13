import { useMe, useLogout } from '~/features/auth/mutations'

export { useMe, useLogout }

export function useMeQuery() {
  return useMe()
}
