import { Client } from '@cmdify/common'

import { Bot, MainModuleOptions } from '..'
import { buildModule, handleEvent, handleMessage } from '.'

export function build<T extends Bot>(
  MainModule: { new (): any },
  options: MainModuleOptions
): T {
  const client = new (options.client || Bot)(
    options.token,
    options.clientOptions
  ) as T

  const main = buildModule(MainModule, client)

  const modules = [main]
  while (modules.length > 0) {
    const module = modules.shift()!!

    for (const listener of module.listeners)
      for (const event in listener.events)
        client.listen(
          event as Client.Event,
          handleEvent(client, listener, event as Client.Event)
        )

    client.listen('message', handleMessage(module))

    modules.push(...module.modules)
  }

  client.__apply(main)
  return client
}
