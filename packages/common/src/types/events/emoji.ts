import { GuildEmoji } from 'discord.js'

import { Client } from '../..'
import { ClientEvent } from '.'

export class EmojiCreateEvent extends ClientEvent {
  public static event: Client.Event = 'emoji create'

  constructor(readonly emoji: GuildEmoji) {
    super()
  }
}

export class EmojiDeleteEvent extends ClientEvent {
  public static event: Client.Event = 'emoji delete'

  constructor(readonly emoji: GuildEmoji) {
    super()
  }
}

export class EmojiUpdateEvent extends ClientEvent {
  public static event: Client.Event = 'emoji update'

  constructor(readonly oldEmoji: GuildEmoji, readonly newEmoji: GuildEmoji) {
    super()
  }
}
