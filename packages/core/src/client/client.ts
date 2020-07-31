import discord, { ClientOptions } from 'discord.js'

import {
  Client,
  Context,
  is,
  isCommandContext,
  isEventContext,
  lateinit
} from '@cmdify/common'

export class Bot extends discord.Client implements Client {
  private module: Client.Module = lateinit

  constructor(private readonly _token: string, options?: ClientOptions) {
    super(options)
  }

  public async login(): Promise<string> {
    await super.destroy()
    return super.login(this._token)
  }

  public listen(event: Client.Event, listener: (...args: any[]) => any): void {
    this.on(event.replace(/ (.)/g, (_, v) => v.toUpperCase()) as any, listener)
  }

  public resolve<T>(value: string, type: Function, ctx: Context): T {
    const module = isCommandContext(ctx)
      ? ctx.command.module
      : isEventContext(ctx)
      ? ctx.listener.module
      : undefined

    if (!module)
      throw new Error(`Internal: Could not find module for resolution`)

    for (const resolver of module.resolvers) {
      if (!is(resolver.target, type)) continue

      return resolver.transform(ctx, value)
    }

    throw new Error(`Could not resolve <${value}> -> <${type}>`)
  }

  public __apply(module: Client.Module) {
    this.module = module
  }
}
