import {
  Argument,
  ArgumentType,
  CommandContext,
  createArgumentDecorator
} from '../..'

@ArgumentType()
class ParametersArgument {
  @Argument(['action', 'handler'])
  public handle(context: CommandContext): string[] {
    return context.args
  }
}

export const Parameters = createArgumentDecorator(ParametersArgument)
export const Params = Parameters
