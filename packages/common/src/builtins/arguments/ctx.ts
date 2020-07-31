import { Channel, Client, Guild, GuildMember, Message, User } from 'discord.js'

import {
  Argument,
  ArgumentType,
  Context,
  createArgumentDecorator,
  EventContext,
  is,
  isCommandContext,
  isEventContext
} from '../..'

@ArgumentType()
class CtxArgument {
  @Argument(['action', 'handler', 'event'])
  public handle(context: Context, type: Function): any {
    const typeIs = is.bind(null, type)

    if (typeIs(Client)) return context.client

    if (isCommandContext(context)) {
      if (typeIs(Channel)) return context.message.channel
      if (typeIs(Guild)) return context.message.guild
      if (typeIs(GuildMember)) return context.message.member
      if (typeIs(Message)) return context.message
      if (typeIs(User)) return context.message.author

      throw new Error(`@Ctx: Invalid type for Action/Handler: ${type}`)
    }

    if (isEventContext(context)) {
      if (typeIs(Channel)) return CtxArgument.channel(context)
      if (typeIs(Guild)) return CtxArgument.guild(context)
      if (typeIs(GuildMember)) return CtxArgument.member(context)
      if (typeIs(Message)) return CtxArgument.message(context)

      throw new Error(`@Ctx: Invalid type for Listener: ${type}`)
    }

    throw new Error(`@Ctx: Internal Error`)
  }

  private static channel(context: EventContext): Channel {
    if (
      [
        'channel create',
        'channel delete',
        'channel pins update',
        'typing start',
        'webhook update'
      ].includes(context.event)
    )
      return context.args[0]

    if (['channel update'].includes(context.event)) return context.args[1]

    throw new Error(`Event ${context.event} does not have "Channel" attribute!`)
  }

  private static guild(context: EventContext): Guild {
    if (
      [
        'guild ban add',
        'guild ban remove',
        'guild create',
        'guild delete',
        'guild integrations update',
        'guild unavailable'
      ].includes(context.event)
    )
      return context.args[0]

    if (
      [
        'guild member add',
        'guild member available',
        'guild member remove',
        'guild member speaking',
        'message'
      ].includes(context.event)
    )
      return context.args[0].guild

    if (['guild members chunk', 'guild update'].includes(context.event))
      return context.args[1]

    throw new Error(`Event ${context.event} does not have "Guild" attribute!`)
  }

  private static member(context: EventContext): GuildMember {
    if (context.event === 'message') return context.args[0].member

    if (
      [
        'guild member add',
        'guild member available',
        'guild member remove',
        'guild member speaking'
      ].includes(context.event)
    )
      return context.args[0]

    if (['guild member update'].includes(context.event)) return context.args[1]

    throw new Error(`Event ${context.event} does not have "Member" attribute!`)
  }

  private static message(context: EventContext): Message {
    if (
      ['message', 'message delete', 'message reaction remove all'].includes(
        context.event
      )
    )
      return context.args[0]

    if (
      ['message update', 'command execute', 'handler execute'].includes(
        context.event
      )
    )
      return context.args[1]

    throw new Error(`Event ${context.event} does not have "Message" attribute!`)
  }
}

export const Ctx = createArgumentDecorator(CtxArgument)()
