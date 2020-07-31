import { Metadata, Symbols } from '../..'

export function Argument(
  type: 'action' | 'handler' | 'event' | ('action' | 'handler' | 'event')[],
  constraints?: any | any[]
): MethodDecorator {
  return (
    target: any,
    property: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    if (Metadata.exists(Symbols.argument, target))
      throw new Error('@Argument: @Argument may only be used once on any class')

    Metadata.define(
      Symbols.argument,
      {
        target: Array.isArray(type) ? type : [type],
        property,
        constraints: !constraints
          ? []
          : Array.isArray(constraints)
          ? constraints
          : [constraints]
      },
      target
    )
  }
}
