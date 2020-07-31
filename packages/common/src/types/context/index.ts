import { Client } from '../..'

export interface Context {
  type: 'action' | 'handler' | 'event'
  client: Client
}

export * from './actionContext'
export * from './commandContext'
export * from './eventContext'
export * from './handlerContext'
