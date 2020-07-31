import { Metadata, Symbols } from '../..'

export function ArgumentType(): ClassDecorator {
  return (Target: Function) => {
    if (Metadata.exists(Symbols.argumentType, Target.prototype))
      throw new Error(
        '@ArgumentType: @ArgumentType may only be used once on any class'
      )

    Metadata.define(Symbols.argumentType, {}, Target.prototype)
  }
}
