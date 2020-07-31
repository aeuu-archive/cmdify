import { User } from 'discord.js'

import { Client } from '../..'
import { ClientEvent } from '.'

export class UserUpdateEvent extends ClientEvent {
  public static event: Client.Event = 'user update'

  constructor(readonly oldUser: User, readonly newUser: User) {
    super()
  }
}
