import {
  ActionContext,
  CommandContext,
  Context,
  EventContext,
  HandlerContext
} from '..'

export const isActionContext = (context: Context): context is ActionContext =>
  context.type === 'action'

export const isEventContext = (context: Context): context is EventContext =>
  context.type === 'event'

export const isHandlerContext = (context: Context): context is HandlerContext =>
  context.type === 'handler'

export const isCommandContext = (context: Context): context is CommandContext =>
  isActionContext(context) || isHandlerContext(context)
