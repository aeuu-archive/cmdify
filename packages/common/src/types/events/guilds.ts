import {
  Collection,
  Guild,
  GuildMember,
  Snowflake,
  Speaking,
  User
} from 'discord.js'

import { Client } from '../..'
import { ClientEvent } from '.'

export class GuildBanAddEvent extends ClientEvent {
  public static event: Client.Event = 'guild ban add'

  constructor(readonly guild: Guild, readonly user: User) {
    super()
  }
}

export class GuildBanRemoveEvent extends ClientEvent {
  public static event: Client.Event = 'guild ban remove'

  constructor(readonly guild: Guild, readonly user: User) {
    super()
  }
}

export class GuildCreateEvent extends ClientEvent {
  public static event: Client.Event = 'guild create'

  constructor(readonly guild: Guild) {
    super()
  }
}

export class GuildDeleteEvent extends ClientEvent {
  public static event: Client.Event = 'guild delete'

  constructor(readonly guild: Guild) {
    super()
  }
}

export class GuildIntegrationsUpdateEvent extends ClientEvent {
  public static event: Client.Event = 'guild integrations update'

  constructor(readonly guild: Guild) {
    super()
  }
}

export class GuildMemberAddEvent extends ClientEvent {
  public static event: Client.Event = 'guild member add'

  constructor(readonly member: GuildMember) {
    super()
  }
}

export class GuildMemberRemoveEvent extends ClientEvent {
  public static event: Client.Event = 'guild member remove'

  constructor(readonly member: GuildMember) {
    super()
  }
}

export class GuildMembersChunkEvent extends ClientEvent {
  public static event: Client.Event = 'guild members chunk'

  constructor(
    readonly members: Collection<Snowflake, GuildMember>,
    readonly guild: Guild
  ) {
    super()
  }
}

export class GuildMemberSpeakingEvent extends ClientEvent {
  public static event: Client.Event = 'guild member speaking'

  constructor(
    readonly member: GuildMember,
    readonly speaking: Readonly<Speaking>
  ) {
    super()
  }
}

export class GuildMemberUpdateEvent extends ClientEvent {
  public static event: Client.Event = 'guild member update'

  constructor(
    readonly oldMember: GuildMember,
    readonly newMember: GuildMember
  ) {
    super()
  }
}

export class GuildUnavailableEvent extends ClientEvent {
  public static event: Client.Event = 'guild unavailable'

  constructor(readonly guild: Guild) {
    super()
  }
}

export class GuildUpdateEvent extends ClientEvent {
  public static event: Client.Event = 'guild update'

  constructor(readonly oldGuild: Guild, readonly newGuild: Guild) {
    super()
  }
}
