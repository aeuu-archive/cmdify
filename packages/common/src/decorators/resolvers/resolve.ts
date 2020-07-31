import { Metadata, ResolverMetadata, Symbols } from '../..'

export function Resolve(type: Function): MethodDecorator {
  return (
    target: any,
    property: string | symbol,
    descriptor: PropertyDescriptor
  ): void => {
    if (type === Object)
      throw new Error(
        '@Resolve: Invalid resolver return type! (Return type must be a class, string, number, array, or undefined)'
      )

    const resolver: ResolverMetadata = {
      target: type,
      property
    }

    Metadata.addList(Symbols.resolver, [resolver], target)
  }
}
