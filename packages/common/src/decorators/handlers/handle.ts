import { ErrorMetadata, HandlerMetadata, Metadata, Symbols } from '../..'

export function Handle(error: any): MethodDecorator {
  return (
    target: any,
    property: string | symbol,
    descriptor: PropertyDescriptor
  ): void => {
    const handler: ErrorMetadata = {
      type: HandlerMetadata.Type.Handler,
      property,
      error
    }

    Metadata.addList(Symbols.handler, [handler], target)
  }
}
