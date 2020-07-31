import { Symbols, Metadata } from '../..'

export interface CommandOptions {
  name: string

  description?: string
  category?: string
  usage?: string

  aliases?: string[]
}

export function Command(name: string): ClassDecorator
export function Command(options: CommandOptions): ClassDecorator

export function Command(a: string | CommandOptions) {
  const options: CommandOptions = typeof a === 'string' ? { name: a } : a

  return (Target: Function): void => {
    if (Metadata.exists(Symbols.command, Target.prototype))
      throw new Error('@Command: @Command may only be used once on any class')

    Metadata.define(
      Symbols.command,
      {
        name: options.name,

        description: options.description,
        category: options.category,
        usage: options.usage,

        aliases: options.aliases || []
      },
      Target.prototype
    )
  }
}
