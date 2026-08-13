declare module 'vue-router' {
  interface RouteMeta {
    appHeaderMode?: import('~/types/app-shell').AppHeaderMode
    hideBottomNav?: boolean
    appHeaderBackTo?: string
    hideAppHeader?: boolean
    hideAppHeaderTitle?: boolean
  }
}

export {}
