import { Metadata, Symbols } from '../..'

export function TypeResolver(): ClassDecorator {
  return (Target: Function) => {
    if (Metadata.exists(Symbols.typeResolver, Target.prototype))
      throw new Error(
        '@TypeResolver: @TypeResolver may only be used once on any class'
      )

    Metadata.define(Symbols.typeResolver, {}, Target.prototype)
  }
}
