import { HandlerMetadata } from '../..'

export interface EventMetadata extends HandlerMetadata {
  type: HandlerMetadata.Type.Event
}
