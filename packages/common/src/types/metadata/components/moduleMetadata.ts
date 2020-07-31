export interface ModuleMetadata {
  name: string
  description?: string

  prefix?: string

  commands: { new (): any }[]
  listeners: { new (): any }[]
  modules: { new (): any }[]

  resolvers: { new (): any }[]

  defaults: {
    action?: { new (): any }
    handlers: { new (): any }[]
  }
}
