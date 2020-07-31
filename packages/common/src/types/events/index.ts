import { Client } from '../..'

export abstract class ClientEvent {}

export namespace ClientEvent {
  export type Type<T extends ClientEvent = ClientEvent> = {
    new (...args: any[]): T
  } & { event: Client.Event }
}

export * from './channels'
export * from './emoji'
export * from './guilds'
export * from './invites'
export * from './messages'
export * from './misc'
export * from './presence'
export * from './roles'
export * from './shards'
export * from './users'
