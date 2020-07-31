import { Message } from 'discord.js'

import { Client } from '../..'
import { Context } from '.'

export interface CommandContext extends Context {
  args: string[]
  message: Message

  command: Client.Command
}
