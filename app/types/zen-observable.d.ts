declare module 'zen-observable' {
  export default class Observable<T> {
    constructor(subscriber: (observer: Observer<T>) => void | (() => void))
    subscribe(observer: Observer<T>): Subscription
  }

  export interface Observer<T> {
    next?: (value: T) => void
    error?: (error: unknown) => void
    complete?: () => void
  }

  export interface Subscription {
    unsubscribe(): void
  }
}
