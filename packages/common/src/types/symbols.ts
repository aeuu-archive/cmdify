import {
  ArgumentMetadata,
  ArgumentTypeMetadata,
  CommandMetadata,
  ExtendMetadata,
  HandlerMetadata,
  InitMetadata,
  ListenerMetadata,
  ParameterMetadata,
  ResolverMetadata,
  TypeResolverMetadata
} from '.'
import { ModuleMetadata } from './metadata/components/moduleMetadata'
import { MainModuleMetadata } from './metadata/components/mainModuleMetadata'

export type Symbols = keyof Symbols.SymbolMap

export namespace Symbols {
  export const argument = Symbol('cmdify:argument')
  export const argumentType = Symbol('cmdify:argument-type')

  export const command = Symbol('cmdify:command')
  export const extend = Symbol('cmdify:extend')
  export const listener = Symbol('cmdify:listener')
  export const module = Symbol('cmdify:module')
  export const mainModule = Symbol('cmdify:main-module')

  export const handler = Symbol('cmdify:handler')
  export const init = Symbol('cmdify:init')
  export const parameter = Symbol('cmdify:parameter')

  export const typeResolver = Symbol('cmdify:type-resolver')
  export const resolver = Symbol('cmdify:resolver')

  export interface SymbolMap {
    [Symbols.argument]: ArgumentMetadata
    [Symbols.argumentType]: ArgumentTypeMetadata

    [Symbols.command]: CommandMetadata
    [Symbols.extend]: ExtendMetadata[]
    [Symbols.listener]: ListenerMetadata
    [Symbols.module]: ModuleMetadata
    [Symbols.mainModule]: MainModuleMetadata

    [Symbols.handler]: HandlerMetadata[]
    [Symbols.init]: InitMetadata
    [Symbols.parameter]: ParameterMetadata[]

    [Symbols.typeResolver]: TypeResolverMetadata
    [Symbols.resolver]: ResolverMetadata[]
  }

  export const values = (): Symbols[] => [command, listener, extend]
}
