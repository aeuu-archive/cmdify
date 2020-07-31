import { GuildMember, User } from 'discord.js'

import { CommandContext, Resolve, TypeResolver } from '../..'

@TypeResolver()
export class UserResolver {
  @Resolve(User)
  public user(ctx: CommandContext, resolvable: string): User | undefined {
    return (
      this.member(ctx, resolvable)?.user ||
      UserResolver.mention(ctx, resolvable) ||
      ctx.client.users.cache.find(
        u =>
          u.id === resolvable ||
          u.username === resolvable ||
          u.tag === resolvable
      )
    )
  }

  @Resolve(GuildMember)
  public member(
    ctx: CommandContext,
    resolvable: string
  ): GuildMember | undefined {
    const mention = UserResolver.mention(ctx, resolvable)

    return ctx.message.guild?.members.cache.find(
      m =>
        (mention && m.user.id === mention.id) ||
        m.displayName === resolvable ||
        m.user.id === resolvable ||
        m.user.username === resolvable ||
        m.user.tag === resolvable
    )
  }

  private static mention(
    ctx: CommandContext,
    mention: string
  ): User | undefined {
    if (!/<@!?.+>/.test(mention)) return

    mention = mention.slice(2, -1)

    if (mention.startsWith('!')) mention = mention.slice(1)

    return ctx.client.users.cache.get(mention)
  }
}
