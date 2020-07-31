import { Context, ParameterMetadata } from '@cmdify/common'

export function applyParameters(
  context: Context,
  metadata: ParameterMetadata[]
): any[] {
  const params = []

  for (const parameter of metadata)
    params[parameter.index] = parameter.transform(context)

  return params
}

export const applyParametersTo = <T>(
  fn: (...args: any[]) => T,
  metadata: ParameterMetadata[]
): ((ctx: Context) => T) => (ctx: Context) =>
  fn(...applyParameters(ctx, metadata))

export * from './build'
export * from './buildCommand'
export * from './buildListener'
export * from './buildModule'
export * from './buildResolver'

export * from './handleEvent'
export * from './handleMessage'
