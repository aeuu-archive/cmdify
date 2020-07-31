import { Client } from '@cmdify/common'

export const handleEvent = (
  client: Client,
  listener: Client.Listener,
  event: Client.Event
) => (...args: any[]) =>
  listener.events[event]?.({
    type: 'event',

    listener,
    event,
    args,
    client
  })
