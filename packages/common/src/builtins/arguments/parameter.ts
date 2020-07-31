import {
  Argument,
  ArgumentType,
  Client,
  CommandContext,
  createArgumentDecorator,
  Init,
  lateinit
} from '../..'

@ArgumentType()
class ParameterArgument {
  @Argument(['action', 'handler'])
  public handle(ctx: CommandContext, type: Function, index: number): string {
    return ctx.client.resolve(ctx.args[index], type, ctx)
  }
}

export const Parameter: (
  index: number
) => ParameterDecorator = createArgumentDecorator<[number]>(ParameterArgument)

export const Param = Parameter
