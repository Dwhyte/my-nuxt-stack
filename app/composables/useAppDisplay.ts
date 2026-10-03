import { useBreakpoints } from '@vueuse/core'

const APP_BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 840,
  lg: 1145,
  xl: 1545,
  xxl: 2138,
} as const

export function useAppDisplay() {
  const breakpoints = useBreakpoints(APP_BREAKPOINTS)
  const mdAndUp = breakpoints.greaterOrEqual('md')

  return {
    mdAndUp,
    isDesktop: mdAndUp,
  }
}
