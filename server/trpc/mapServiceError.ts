import { TRPCError } from '@trpc/server'
import { isServiceError } from '../lib/ServiceError'

const trpcCodeFromServiceCode = (code: string): TRPCError['code'] => {
  switch (code) {
    case 'UNAUTHENTICATED':
      return 'UNAUTHORIZED'
    case 'FORBIDDEN':
      return 'FORBIDDEN'
    case 'NOT_FOUND':
      return 'NOT_FOUND'
    case 'CONFLICT':
      return 'CONFLICT'
    case 'BAD_USER_INPUT':
      return 'BAD_REQUEST'
    case 'FAILED_PRECONDITION':
      return 'PRECONDITION_FAILED'
    default:
      return 'INTERNAL_SERVER_ERROR'
  }
}

export const mapErrorToTrpc = (error: unknown): never => {
  if (error instanceof TRPCError) {
    throw error
  }

  if (isServiceError(error)) {
    throw new TRPCError({
      code: trpcCodeFromServiceCode(error.code),
      message: error.message,
    })
  }

  console.error('[tRPC] unhandled error', error)
  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error',
  })
}

export const withTrpcError = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn()
  } catch (error) {
    return mapErrorToTrpc(error)
  }
}
