import { Symbols } from '../..'

export interface ExtendMetadata {
  component: Symbols
  target: { new (): any }
}
