import { HandlerMetadata } from '../..'

export interface ActionMetadata extends HandlerMetadata {
  type: HandlerMetadata.Type.Action
}
