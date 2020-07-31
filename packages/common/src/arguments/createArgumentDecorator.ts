import { Context, Metadata, ParameterMetadata, Symbols } from '..'

export function createArgumentDecorator<
  T extends any[] = [],
  C extends Context = Context
>(ArgumentType: { new (): any }): (...args: T) => ParameterDecorator {
  const instance = new ArgumentType()

  if (!Metadata.exists(Symbols.argumentType, instance))
    throw new Error('Cannot build argument type without @ArgumentType')

  if (!Metadata.exists(Symbols.argument, instance))
    throw new Error('Cannot build argument type without @Argument')

  const metadata = Metadata.get(Symbols.argument, instance)!!

  const fn: (ctx: C, type: Function, ...args: T) => void = instance[
    metadata.property
  ].bind(instance)

  return (...args: T): ParameterDecorator => {
    return (
      target: any,
      property: string | symbol,
      parameterIndex: number
    ): void => {
      const type = Reflect.getMetadata('design:paramtypes', target, property)[
        parameterIndex
      ]

      const meta: ParameterMetadata<C> = {
        target: metadata.target,
        constraints: metadata.constraints,
        index: parameterIndex,
        type,
        transform: ctx => fn(ctx, type, ...args)
      }

      Metadata.addList(
        Symbols.parameter,
        [meta as ParameterMetadata],
        target,
        property
      )
    }
  }
}
