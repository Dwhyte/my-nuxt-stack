import { VueQueryPlugin } from '@tanstack/vue-query'
import { createQueryClient } from '~/lib/trpc'

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = createQueryClient()

  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient })

  return {
    provide: {
      queryClient,
    },
  }
})
