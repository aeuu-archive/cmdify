import { Metadata, Symbols } from '../..'

export interface ModuleOptions {
  name: string
  description?: string

  prefix?: string

  commands?: { new (): any }[]
  listeners?: { new (): any }[]
  modules?: { new (): any }[]
  resolvers?: { new (): any }[]

  defaults?: {
    action?: { new (): any }
    handlers?: { new (): any }[]
  }
}

export function Module(options: ModuleOptions): ClassDecorator {
  return (Target: Function): void => {
    if (Metadata.exists(Symbols.module, Target.prototype))
      throw new Error('@Module: @Module may only be used once on any class')

    Metadata.define(
      Symbols.module,
      {
        name: options.name,

        description: options.description,

        prefix: options.prefix,

        commands: options.commands || [],
        listeners: options.listeners || [],
        modules: options.modules || [],
        resolvers: options.resolvers || [],

        defaults: {
          action: options.defaults?.action,
          handlers: options.defaults?.handlers || []
        }
      },
      Target.prototype
    )
  }
}
