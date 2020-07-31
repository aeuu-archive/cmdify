export interface HandlerMetadata {
  type: HandlerMetadata.Type
  property: string | symbol
}

export namespace HandlerMetadata {
  export enum Type {
    Action,
    Handler,
    Event
  }
}
