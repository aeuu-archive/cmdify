export interface ArgumentMetadata {
  target: ('action' | 'handler' | 'event')[]
  constraints: any[]
  property: string | symbol
}
