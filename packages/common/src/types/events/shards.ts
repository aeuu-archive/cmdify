import { Client } from '../..'
import { ClientEvent } from '.'

export class ShardDisconnectEvent extends ClientEvent {
  public static event: Client.Event = 'shard disconnect'

  constructor(readonly event: CloseEvent, readonly id: number) {
    super()
  }
}

export class ShardErrorEvent extends ClientEvent {
  public static event: Client.Event = 'shard error'

  constructor(readonly error: Error, readonly id: number) {
    super()
  }
}

export class ShardReadyEvent extends ClientEvent {
  public static event: Client.Event = 'shard ready'

  constructor(
    readonly id: number,
    readonly unavailableGuilds: Set<string> | undefined
  ) {
    super()
  }
}

export class ShardReconnectingEvent extends ClientEvent {
  public static event: Client.Event = 'shard reconnecting'

  constructor(readonly id: number) {
    super()
  }
}

export class ShardResumeEvent extends ClientEvent {
  public static event: Client.Event = 'shard resume'

  constructor(readonly id: number, readonly replayedEvents: number) {
    super()
  }
}
