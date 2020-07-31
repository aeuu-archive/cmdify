import { ActionMetadata, HandlerMetadata, Metadata, Symbols } from '../..'

export function Action(): MethodDecorator {
  return (
    target: any,
    property: string | symbol,
    descriptor: PropertyDescriptor
  ): void => {
    const meta = Metadata.get(Symbols.handler, target) || []

    if (meta.some(m => m.type === HandlerMetadata.Type.Action))
      throw new Error('@Action: A class may only have one @Action decorator!')

    const handler: ActionMetadata = {
      type: HandlerMetadata.Type.Action,
      property
    }

    Metadata.addList(Symbols.handler, [handler], target)
  }
}
