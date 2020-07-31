import {
  Collection,
  Message,
  MessageReaction,
  Snowflake,
  User
} from 'discord.js'

import { Client } from '../..'
import { ClientEvent } from '.'

export class MessageEvent extends ClientEvent {
  public static event: Client.Event = 'message'

  constructor(readonly message: Message) {
    super()
  }
}

export class MessageDeleteEvent extends ClientEvent {
  public static event: Client.Event = 'message delete'

  constructor(readonly message: Message) {
    super()
  }
}

export class MessageDeleteBulkEvent extends ClientEvent {
  public static event: Client.Event = 'message delete bulk'

  constructor(readonly messages: Collection<Snowflake, Message>) {
    super()
  }
}

export class MessageReactionAddEvent extends ClientEvent {
  public static event: Client.Event = 'message reaction add'

  constructor(readonly reaction: MessageReaction, readonly user: User) {
    super()
  }
}

export class MessageReactionRemoveEvent extends ClientEvent {
  public static event: Client.Event = 'message reaction remove'

  constructor(readonly reaction: MessageReaction, readonly user: User) {
    super()
  }
}

export class MessageReactionRemoveAllEvent extends ClientEvent {
  public static event: Client.Event = 'message reaction remove all'

  constructor(readonly message: Message) {
    super()
  }
}

export class MessageReactionRemoveEmojiEvent extends ClientEvent {
  public static event: Client.Event = 'message reaction remove emoji'

  constructor(readonly reaction: MessageReaction) {
    super()
  }
}

export class MessageUpdateEvent extends ClientEvent {
  public static event: Client.Event = 'message update'

  constructor(readonly oldMessage: Message, readonly newMessage: Message) {
    super()
  }
}
