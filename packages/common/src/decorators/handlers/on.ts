import { EventMetadata, HandlerMetadata, Metadata, Symbols } from '../..'

export function On(): MethodDecorator {
  return (
    target: any,
    property: string | symbol,
    descriptor: PropertyDescriptor
  ): void => {
    const handler: EventMetadata = {
      type: HandlerMetadata.Type.Event,
      property
    }

    Metadata.addList(Symbols.handler, [handler], target)
  }
}
