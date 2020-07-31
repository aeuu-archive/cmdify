import { Client } from '../..'
import { ClientEvent } from '.'

export class DebugEvent extends ClientEvent {
  public static event: Client.Event = 'debug'

  constructor(readonly info: string) {
    super()
  }
}

export class ErrorEvent extends ClientEvent {
  public static event: Client.Event = 'error'

  constructor(readonly error: Error) {
    super()
  }
}

export class InvalidatedEvent extends ClientEvent {
  public static event: Client.Event = 'invalidated'

  constructor() {
    super()
  }
}

export class RateLimitEvent extends ClientEvent {
  public static event: Client.Event = 'rate limit'

  constructor(
    readonly info: {
      timeout: number
      limit: number
      method: string
      path: string
      route: string
    }
  ) {
    super()
  }
}

export class ReadyEvent extends ClientEvent {
  public static event: Client.Event = 'ready'

  constructor() {
    super()
  }
}

export class WarnEvent extends ClientEvent {
  public static event: Client.Event = 'warn'

  constructor(readonly info: string) {
    super()
  }
}
