import { HandlerMetadata } from '../..'

export interface ErrorMetadata extends HandlerMetadata {
  type: HandlerMetadata.Type.Handler
  error: any
}
