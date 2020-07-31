import { Invite } from 'discord.js'

import { Client } from '../..'
import { ClientEvent } from '.'

export class InviteCreateEvent extends ClientEvent {
  public static event: Client.Event = 'invite create'

  constructor(readonly invite: Invite) {
    super()
  }
}

export class InviteDeleteEvent extends ClientEvent {
  public static event: Client.Event = 'invite delete'

  constructor(readonly invite: Invite) {
    super()
  }
}
