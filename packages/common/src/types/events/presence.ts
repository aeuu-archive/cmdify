import { Presence } from 'discord.js'

import { Client } from '../..'
import { ClientEvent } from '.'

export class PresenceUpdateEvent extends ClientEvent {
  public static event: Client.Event = 'presence update'

  constructor(
    readonly oldPresence: Presence | undefined,
    readonly newPresence: Presence
  ) {
    super()
  }
}
