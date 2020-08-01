import {
  Client,
  ClientEvent,
  EventMetadata,
  HandlerMetadata,
  is,
  Metadata,
  Symbols
} from '@cmdify/common'

import { applyParametersTo } from '..'

export function buildListener(
  Listener: { new (): any },
  module: Client.Module
): Client.Listener {
  const instance = new Listener()

  if (!Metadata.exists(Symbols.listener, instance))
    throw new Error('Cannot build listener without @Listener')

  const metadata = Metadata.get(Symbols.listener, instance)!!

  if (!Metadata.exists(Symbols.handler, instance))
    return new Client.Listener(metadata, module)

  const listener = new Client.Listener(metadata, module)
  listener.events = buildHandlers(instance)

  if (Metadata.exists(Symbols.init, instance))
    instance[Metadata.get(Symbols.init, instance)!!.property].call(instance, listener)

  return listener
}

function buildHandlers(instance: any): Client.Listener['events'] {
  const handlers = Metadata.get(Symbols.handler, instance)?.filter(
    h => h.type === HandlerMetadata.Type.Event
  )

  if (!handlers || handlers.length < 1) return {}

  let list = {}

  for (const item of handlers
    .map(buildHandler.bind(null, instance))
    .filter(h => !!h))
    list = { ...list, ...item }

  return list
}

function buildHandler(
  instance: any,
  handler: HandlerMetadata
): Client.Listener['events'] {
  const parameters =
    Metadata.get(Symbols.parameter, instance, handler.property) || []

  for (const parameter of parameters)
    if (!parameter.target.includes('event'))
      throw new Error('Parameter not applicable to "event"')

  const event = parameters.find(
    p => p.type.event && typeof p.type.event === 'string'
  )?.type.event as Client.Event

  if (!event)
    throw new Error(
      '@On event handler must have parameter with @Event and type <? extends ClientEvent>'
    )

  return {
    [event]: applyParametersTo(instance[handler.property], parameters).bind(instance)
  }
}
