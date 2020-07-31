import {
  Client,
  Metadata,
  PrimitiveResolver,
  Symbols,
  UserResolver
} from '@cmdify/common'

import { buildCommand, buildListener, buildResolvers } from '..'

export function buildModule(
  Module: { new (): any },
  client: Client,
  base?: Client.Module
): Client.Module {
  const instance = new Module()

  if (!Metadata.exists(Symbols.module, instance))
    throw new Error('Cannot build module without @Module')

  const metadata = Metadata.get(Symbols.module, instance)!!

  const module = new Client.Module(metadata, client, base)
  module.commands = metadata.commands.map(c => buildCommand(c, module))
  module.listeners = metadata.listeners.map(l => buildListener(l, module))

  module.defaults.handlers = metadata.defaults.handlers.map(h =>
    buildCommand(h, module)
  )

  if (metadata.defaults.action)
    module.defaults.action = buildCommand(metadata.defaults.action, module)

  module.modules = metadata.modules.map(m => buildModule(m, client, module))

  module.resolvers = buildResolvers(
    [...metadata.resolvers, PrimitiveResolver, UserResolver],
    module
  )

  if (Metadata.exists(Symbols.init, instance))
    instance[Metadata.get(Symbols.init, instance)!!.property](module)

  return module
}
