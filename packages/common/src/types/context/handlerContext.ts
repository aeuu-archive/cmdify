import { CommandContext } from '.'

export interface HandlerContext extends CommandContext {
  type: 'handler'
  target: any
  error: any
}
