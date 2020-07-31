import { Client, Metadata, Symbols } from '@cmdify/common'

export function buildResolver(
  Resolver: {
    new (): any
  },
  module: Client.Module
): Client.Resolver[] {
  const instance = new Resolver()

  if (!Metadata.exists(Symbols.typeResolver, instance))
    throw new Error('Cannot build type resolver without @TypeResolver')

  if (!Metadata.exists(Symbols.resolver, instance))
    throw new Error('Cannot build type resolver without @Resolve')

  if (Metadata.exists(Symbols.init, instance))
    instance[Metadata.get(Symbols.init, instance)!!.property](module.client)

  return Metadata.get(Symbols.resolver, instance)!!.map(r => {
    const resolver = new Client.Resolver(module)
    resolver.target = r.target
    resolver.transform = instance[r.property].bind(instance)

    return resolver
  })
}

export const buildResolvers = (
  resolvers: { new (): any }[],
  module: Client.Module
): Client.Resolver[] => resolvers.map(r => buildResolver(r, module)).flat()
