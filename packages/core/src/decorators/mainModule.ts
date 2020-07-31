import { ClientOptions } from 'discord.js'

import { Module, ModuleOptions } from '@cmdify/common'

import { Bot, build } from '..'

export interface MainModuleOptions extends ModuleOptions {
  token: string

  prefix: string

  client?: { new (token: string, options?: ClientOptions): Bot }
  clientOptions?: ClientOptions
}

export function MainModule(options: MainModuleOptions): ClassDecorator {
  return (Target: Function): void => {
    // Apply @Module(options)
    Module(options)(Target)

    const client = build(Target as { new (): any }, options)
    client.login().then()
  }
}
