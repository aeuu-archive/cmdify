import discord from 'discord.js'

import {
  Context,
  ActionContext,
  EventContext,
  HandlerContext,
  CommandMetadata,
  ListenerMetadata,
  ModuleMetadata
} from '..'

export interface Client extends discord.Client {
  login(): Promise<string>

  listen(event: Client.Event, listener: (...args: any[]) => any): void

  resolve<T>(value: string, type: Function, ctx: Context): T
}

export namespace Client {
  export class Module<T extends Client = Client> {
    public name: string
    public description: string
    public prefix: string

    public commands: Command<T>[] = []
    public listeners: Listener<T>[] = []
    public modules: Module<T>[] = []
    public resolvers: Resolver<T>[] = []

    public defaults: { action?: Command<T>; handlers: Command<T>[] } = {
      handlers: []
    }

    constructor(
      metadata: ModuleMetadata,
      public readonly client: T,
      public readonly parent?: Module<T>
    ) {
      this.name = metadata.name
      this.description = metadata.description || 'No description'
      this.prefix = metadata.prefix || parent!!.prefix
    }
  }

  export class Command<T extends Client = Client> {
    public readonly client: T = this.module.client

    public readonly name: string
    public readonly description: string
    public readonly category: string
    public readonly usage: string

    public readonly aliases: string[]

    public action: (ctx: ActionContext) => any = () => {}
    public handlers: {
      target: any
      handle: (ctx: HandlerContext) => any
    }[] = []

    constructor(metadata: CommandMetadata, public readonly module: Module<T>) {
      this.name = metadata.name
      this.description = metadata.description || 'No description'
      this.category = metadata.category || 'No category'
      this.usage = metadata.usage || 'No usage'
      this.aliases = metadata.aliases || []
    }
  }

  export class Listener<T extends Client = Client> {
    public readonly client: T = this.module.client

    public readonly name: string
    public readonly description: string

    public events: { [key in Event]?: (ctx: EventContext) => any } = {}

    constructor(metadata: ListenerMetadata, public readonly module: Module<T>) {
      this.name = metadata.name || 'No name'
      this.description = metadata.description || 'No description'
    }
  }

  export class Resolver<T extends Client = Client> {
    public readonly client: T = this.module.client

    public target: Function = () => {}
    public transform: (context: Context, value: string) => any = () => {}

    constructor(public readonly module: Module<T>) {}
  }

  export type Event = CmdifyEvent | DiscordEvent

  export type CmdifyEvent = 'command execute' | 'handler execute'

  export type DiscordEvent =
    | 'channel create'
    | 'channel delete'
    | 'channel pins update'
    | 'channel update'
    | 'debug'
    | 'emoji create'
    | 'emoji delete'
    | 'emoji update'
    | 'error'
    | 'guild ban add'
    | 'guild ban remove'
    | 'guild create'
    | 'guild delete'
    | 'guild integrations update'
    | 'guild member add'
    | 'guild member remove'
    | 'guild members chunk'
    | 'guild member speaking'
    | 'guild member update'
    | 'guild unavailable'
    | 'guild update'
    | 'invalidated'
    | 'invite create'
    | 'invite delete'
    | 'message'
    | 'message delete'
    | 'message delete bulk'
    | 'message reaction add'
    | 'message reaction remove'
    | 'message reaction remove all'
    | 'message reaction remove emoji'
    | 'message update'
    | 'presence update'
    | 'rate limit'
    | 'ready'
    | 'role create'
    | 'role delete'
    | 'role update'
    | 'shard disconnect'
    | 'shard error'
    | 'shard ready'
    | 'shard reconnecting'
    | 'shard resume'
    | 'typing start'
    | 'user update'
    | 'voice state update'
    | 'warn'
    | 'webhook update'
}
