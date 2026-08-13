import { accountRouter } from './account'
import { authRouter } from './auth'
import { demoRouter } from './demo'
import { publicRouter } from './public'
import { userRouter } from './user'
import { router } from '../trpc'

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  account: accountRouter,
  demo: demoRouter,
  public: publicRouter,
})

export type AppRouter = typeof appRouter
