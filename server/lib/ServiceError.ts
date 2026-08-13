export class ServiceError extends Error {
  readonly code: string
  readonly httpStatus?: number

  constructor(code: string, message: string, httpStatus?: number) {
    super(message)
    this.name = 'ServiceError'
    this.code = code
    this.httpStatus = httpStatus
  }
}

export const isServiceError = (error: unknown): error is ServiceError => error instanceof ServiceError
