import { CommandContext } from '.'

export interface ActionContext extends CommandContext {
  type: 'action'
}
