import {
  ActionContext,
  Client,
  ErrorMetadata,
  HandlerMetadata,
  Metadata,
  Symbols
} from '@cmdify/common'

import { applyParameters, applyParametersTo } from '.'

export function buildCommand(
  Command: { new (): any },
  module: Client.Module
): Client.Command {
  const instance = new Command()

  if (!Metadata.exists(Symbols.command, instance))
    throw new Error('Cannot build command without @Command')

  const metadata = Metadata.get(Symbols.command, instance)!!

  if (!Metadata.exists(Symbols.handler, instance))
    return new Client.Command(metadata, module)

  const command = new Client.Command(metadata, module)
  command.action = buildAction(instance) || (() => {})
  command.handlers = buildHandlers(instance)

  if (Metadata.exists(Symbols.init, instance))
    instance[Metadata.get(Symbols.init, instance)!!.property].call(instance, command)

  return command
}

function buildAction(instance: any): Client.Command['action'] | undefined {
  const handler = Metadata.get(Symbols.handler, instance)?.find(
    h => h.type === HandlerMetadata.Type.Action
  )

  if (!handler) return

  const parameters =
    Metadata.get(Symbols.parameter, instance, handler.property) || []

  for (const parameter of parameters)
    if (!parameter.target.includes('action'))
      throw new Error('Parameter not applicable to "action"')

  return applyParametersTo(instance[handler.property], parameters).bind(instance)
}

function buildHandlers(instance: any): Client.Command['handlers'] {
  const handlers = Metadata.get(Symbols.handler, instance)?.filter(
    h => h.type === HandlerMetadata.Type.Handler
  ) as ErrorMetadata[]

  return !handlers || handlers.length < 1
    ? []
    : handlers.map(buildHandler.bind(null, instance)).filter(h => !!h)
}

function buildHandler(
  instance: any,
  handler: ErrorMetadata
): Client.Command['handlers'][0] {
  const parameters =
    Metadata.get(Symbols.parameter, instance, handler.property) || []

  for (const parameter of parameters)
    if (!parameter.target.includes('handler'))
      throw new Error('Parameter not applicable to "handler"')

  return {
    target: handler.error,
    handle: applyParametersTo(instance[handler.property], parameters).bind(instance)
  }
}
