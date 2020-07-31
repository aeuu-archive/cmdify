import { CommandContext, Resolve, TypeResolver } from '../..'

@TypeResolver()
export class PrimitiveResolver {
  @Resolve(Number) // number
  public number(ctx: CommandContext, value: string): number {
    return parseFloat(value)
  }

  @Resolve(String) // string
  public string(ctx: CommandContext, value: string): string {
    return value
  }

  @Resolve(Boolean) // boolean
  public boolean(ctx: CommandContext, value: string): boolean {
    return ['1', 'yes', 'true', 'y'].includes(value.toLowerCase())
  }

  @Resolve(Array) // any[]
  public array(ctx: CommandContext, value: string): string[] {
    return value.split(',')
  }
}
