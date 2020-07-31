import { Symbols } from '..'

export namespace Metadata {
  export const get = <T extends keyof Symbols.SymbolMap>(
    symbol: T,
    target: any,
    property?: string | symbol
  ): Symbols.SymbolMap[T] | undefined =>
    property
      ? Reflect.getMetadata(symbol, target, property)
      : Reflect.getMetadata(symbol, target)

  export const ensure = <T extends keyof Symbols.SymbolMap>(
    symbol: T,
    fallback: Symbols.SymbolMap[T],
    target: any,
    property?: string | symbol
  ): Symbols.SymbolMap[T] => get(symbol, target, property) || fallback

  export const define = <T extends keyof Symbols.SymbolMap>(
    symbol: T,
    value: Symbols.SymbolMap[T],
    target: any,
    property?: string | symbol
  ): void =>
    property
      ? Reflect.defineMetadata(symbol, value, target, property)
      : Reflect.defineMetadata(symbol, value, target)

  export const add = <T extends keyof Symbols.SymbolMap>(
    symbol: T,
    value: Symbols.SymbolMap[T],
    target: any,
    property?: string | symbol
  ): void =>
    define(symbol, {
      ...(get(symbol, target, property) || {}),
      ...value
    }, target, property)

  export const addList = <T extends keyof Symbols.SymbolMap>(
    symbol: T,
    value: any[] & Symbols.SymbolMap[T],
    target: any,
    property?: string | symbol
  ): void =>
    define(symbol, [
      ...((get(symbol, target, property) as any[]) || []),
      ...value
    ] as Symbols.SymbolMap[T], target, property)

  export const exists = <T extends keyof Symbols.SymbolMap>(
    symbol: T,
    target: any,
    property?: string | symbol
  ): boolean =>
    property
      ? Reflect.hasMetadata(symbol, target, property)
      : Reflect.hasMetadata(symbol, target)
}
