import { Message, MessageEmbed } from 'discord.js'
import { ActionContext, Client } from '@cmdify/common'

export const handleMessage = (module: Client.Module) => async (
  message: Message
) => {
  // TODO: Add option toggle for this
  if (message.author.bot) return

  if (!message.content.startsWith(module.prefix)) return

  const args =
    message.content.slice(module.prefix.length).trim().split(/ +/g) || []

  // TODO: Add option for case sensitivity
  const commandName = args.shift()?.toLowerCase() || ''

  const command = module.commands.find(
    c =>
      c.name === commandName.toLowerCase() ||
      (c.aliases || []).map(k => k.toLowerCase()).includes(commandName.toLowerCase())
  )

  if (!command) return

  const context: ActionContext = {
    type: 'action',

    args,
    message,

    client: command.client,
    command: command
  }

  try {
    module.client.emit('command execute' as any, command, message)

    await command.action(context)
  } catch (e) {
    const handler = command.handlers.find(h =>
      typeof h.target === 'string'
        ? e.toString() === h.target
        : typeof h.target === 'function'
        ? e instanceof h.target
        : false
    )

    if (!handler) {
      await message.channel.send({
        embed: new MessageEmbed()
          .setColor('RED')
          .addField('Error', 'An unexpected error has occurred!')
      })
      console.error(e)

      return
    }

    await handler.handle({
      ...context,

      type: 'handler',
      target: handler.target,
      error: e
    })
  }
}
