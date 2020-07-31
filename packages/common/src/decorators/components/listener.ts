import { Metadata, Symbols } from '../..'

export interface ListenerOptions {
  name?: string
  description?: string
}

export function Listener(): ClassDecorator
export function Listener(name: string): ClassDecorator
export function Listener(options: ListenerOptions): ClassDecorator

export function Listener(a?: string | ListenerOptions) {
  const options: ListenerOptions = !a
    ? {}
    : typeof a === 'string'
    ? { name: a }
    : a

  return (Target: Function): void => {
    if (Metadata.exists(Symbols.listener, Target.prototype))
      throw new Error('@Listener: @Listener may only be used once on any class')

    Metadata.define(
      Symbols.listener,
      {
        name: options.name,
        description: options.description
      },
      Target.prototype
    )
  }
}
