import { Context } from '../..'

export interface ParameterMetadata<T extends Context = Context> {
  transform: (data: T) => any
  target: ('action' | 'handler' | 'event')[]
  constraints: any[]
  type: any
  index: number
}
