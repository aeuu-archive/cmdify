import {
  Argument,
  ArgumentType,
  createArgumentDecorator,
  EventContext
} from '../..'

@ArgumentType()
class EventArgument {
  @Argument('event')
  public handle(ctx: EventContext, Type: { new (...args: any[]): any }): any {
    return new Type(...ctx.args)
  }
}

export const Event = createArgumentDecorator(EventArgument)()
