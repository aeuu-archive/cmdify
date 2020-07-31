import { Metadata, Symbols } from '../..'

export function Init(): MethodDecorator {
  return (
    target: any,
    property: string | symbol,
    descriptor: PropertyDescriptor
  ): void => {
    if (Metadata.exists(Symbols.init, target))
      throw new Error('@Init: A class may only have one @Init decorator!')

    Metadata.define(
      Symbols.init,
      {
        property
      },
      target
    )
  }
}
