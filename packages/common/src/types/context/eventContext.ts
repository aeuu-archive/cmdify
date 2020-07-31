import { Client } from '../..'
import { Context } from '.'

export interface EventContext extends Context {
  event: Client.Event
  args: any[]

  listener: Client.Listener
}
