import {
  Channel,
  DMChannel,
  GuildChannel,
  TextChannel,
  User,
  VoiceState
} from 'discord.js'

import { Client } from '../..'
import { ClientEvent } from '.'

export class ChannelCreateEvent extends ClientEvent {
  public static event: Client.Event = 'channel create'

  constructor(readonly channel: DMChannel | GuildChannel) {
    super()
  }
}

export class ChannelDeleteEvent extends ClientEvent {
  public static event: Client.Event = 'channel delete'

  constructor(readonly channel: DMChannel | GuildChannel) {
    super()
  }
}

export class ChannelPinsUpdateEvent extends ClientEvent {
  public static event: Client.Event = 'channel pins update'

  constructor(readonly channel: DMChannel | GuildChannel, readonly time: Date) {
    super()
  }
}

export class ChannelUpdateEvent extends ClientEvent {
  public static event: Client.Event = 'channel update'

  constructor(
    readonly oldChannel: DMChannel | GuildChannel,
    readonly newChannel: DMChannel | GuildChannel
  ) {
    super()
  }
}

export class TypingStartEvent extends ClientEvent {
  public static event: Client.Event = 'typing start'

  constructor(readonly channel: Channel, readonly user: User) {
    super()
  }
}

export class VoiceStateUpdateEvent extends ClientEvent {
  public static event: Client.Event = 'voice state update'

  constructor(readonly oldState: VoiceState, readonly newState: VoiceState) {
    super()
  }
}

export class WebhookUpdateEvent extends ClientEvent {
  public static event: Client.Event = 'webhook update'

  constructor(readonly channel: TextChannel) {
    super()
  }
}
