import { Role } from 'discord.js'

import { Client } from '../..'
import { ClientEvent } from '.'

export class RoleCreateEvent extends ClientEvent {
  public static event: Client.Event = 'role create'

  constructor(readonly role: Role) {
    super()
  }
}

export class RoleDeleteEvent extends ClientEvent {
  public static event: Client.Event = 'role delete'

  constructor(readonly role: Role) {
    super()
  }
}

export class RoleUpdateEvent extends ClientEvent {
  public static event: Client.Event = 'role update'

  constructor(readonly oldRole: Role, readonly newRole: Role) {
    super()
  }
}
