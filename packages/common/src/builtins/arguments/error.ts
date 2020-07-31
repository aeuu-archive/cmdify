import {
  Argument,
  ArgumentType,
  createArgumentDecorator,
  HandlerContext
} from '../..'

@ArgumentType()
class ErrorArgument {
  @Argument(['handler'])
  public handle(context: HandlerContext): any {
    return context.error
  }
}

export const Error = createArgumentDecorator(ErrorArgument)()
