export interface ClientOptions<T> {
  onConnected?: (client: T) => void
  onError?: (e: unknown) => void
}
