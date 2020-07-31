import {
  Argument,
  ArgumentType,
  ChannelCreateEvent,
  ChannelDeleteEvent,
  ChannelPinsUpdateEvent,
  ChannelUpdateEvent,
  createArgumentDecorator,
  DebugEvent,
  EmojiCreateEvent,
  EmojiDeleteEvent,
  EmojiUpdateEvent,
  EventContext,
  GuildBanAddEvent,
  GuildBanRemoveEvent,
  GuildCreateEvent,
  GuildDeleteEvent,
  GuildIntegrationsUpdateEvent,
  GuildMemberAddEvent,
  GuildMemberRemoveEvent,
  GuildMembersChunkEvent,
  GuildMemberSpeakingEvent,
  GuildMemberUpdateEvent,
  GuildUnavailableEvent,
  GuildUpdateEvent,
  InvalidatedEvent,
  InviteCreateEvent,
  InviteDeleteEvent,
  is,
  MessageDeleteBulkEvent,
  MessageDeleteEvent,
  MessageEvent,
  MessageReactionAddEvent,
  MessageReactionRemoveAllEvent,
  MessageReactionRemoveEmojiEvent,
  MessageReactionRemoveEvent,
  MessageUpdateEvent,
  PresenceUpdateEvent,
  RateLimitEvent,
  ReadyEvent,
  RoleCreateEvent,
  RoleDeleteEvent,
  RoleUpdateEvent,
  ShardDisconnectEvent,
  ShardErrorEvent,
  ShardReadyEvent,
  ShardReconnectingEvent,
  ShardResumeEvent,
  TypingStartEvent,
  UserUpdateEvent,
  VoiceStateUpdateEvent,
  WarnEvent,
  WebhookUpdateEvent
} from '../..'

@ArgumentType()
class EventArgument {
  @Argument('event')
  public handle(ctx: EventContext, Type: { new (...args: any[]): any }): any {
    return new Type(...ctx.args)

    // if (!is(type, Object))
    //   throw new Error('@Event: Parameter type must be an Event')
    //
    // switch (ctx.event) {
    //   case 'channel create':
    //     return { channel: ctx.args[0] } as ChannelCreateEvent
    //
    //   case 'channel delete':
    //     return { channel: ctx.args[0] } as ChannelDeleteEvent
    //
    //   case 'channel pins update':
    //     return {
    //       channel: ctx.args[0],
    //       time: ctx.args[1]
    //     } as ChannelPinsUpdateEvent
    //
    //   case 'channel update':
    //     return {
    //       oldChannel: ctx.args[0],
    //       newChannel: ctx.args[1]
    //     } as ChannelUpdateEvent
    //
    //   case 'debug':
    //     return { info: ctx.args[0] } as DebugEvent
    //
    //   case 'emoji create':
    //     return { emoji: ctx.args[0] } as EmojiCreateEvent
    //
    //   case 'emoji delete':
    //     return { emoji: ctx.args[0] } as EmojiDeleteEvent
    //
    //   case 'emoji update':
    //     return {
    //       oldEmoji: ctx.args[0],
    //       newEmoji: ctx.args[1]
    //     } as EmojiUpdateEvent
    //
    //   case 'error':
    //     return { error: ctx.args[0] } as ErrorEvent
    //
    //   case 'guild ban add':
    //     return { guild: ctx.args[0], user: ctx.args[1] } as GuildBanAddEvent
    //
    //   case 'guild ban remove':
    //     return { guild: ctx.args[0], user: ctx.args[1] } as GuildBanRemoveEvent
    //
    //   case 'guild create':
    //     return { guild: ctx.args[0] } as GuildCreateEvent
    //
    //   case 'guild delete':
    //     return { guild: ctx.args[0] } as GuildDeleteEvent
    //
    //   case 'guild integrations update':
    //     return { guild: ctx.args[0] } as GuildIntegrationsUpdateEvent
    //
    //   case 'guild member add':
    //     return { member: ctx.args[0] } as GuildMemberAddEvent
    //
    //   case 'guild member remove':
    //     return { member: ctx.args[0] } as GuildMemberRemoveEvent
    //
    //   case 'guild members chunk':
    //     return {
    //       members: ctx.args[0],
    //       guild: ctx.args[1]
    //     } as GuildMembersChunkEvent
    //
    //   case 'guild member speaking':
    //     return {
    //       member: ctx.args[0],
    //       speaking: ctx.args[1]
    //     } as GuildMemberSpeakingEvent
    //
    //   case 'guild member update':
    //     return {
    //       oldMember: ctx.args[0],
    //       newMember: ctx.args[1]
    //     } as GuildMemberUpdateEvent
    //
    //   case 'guild unavailable':
    //     return { guild: ctx.args[0] } as GuildUnavailableEvent
    //
    //   case 'guild update':
    //     return {
    //       oldGuild: ctx.args[0],
    //       newGuild: ctx.args[1]
    //     } as GuildUpdateEvent
    //
    //   case 'invalidated':
    //     return {} as InvalidatedEvent
    //
    //   case 'invite create':
    //     return { invite: ctx.args[0] } as InviteCreateEvent
    //
    //   case 'invite delete':
    //     return { invite: ctx.args[0] } as InviteDeleteEvent
    //
    //   case 'message':
    //     return { message: ctx.args[0] } as MessageEvent
    //
    //   case 'message delete':
    //     return { message: ctx.args[0] } as MessageDeleteEvent
    //
    //   case 'message delete bulk':
    //     return { messages: ctx.args[0] } as MessageDeleteBulkEvent
    //
    //   case 'message reaction add':
    //     return {
    //       reaction: ctx.args[0],
    //       user: ctx.args[1]
    //     } as MessageReactionAddEvent
    //
    //   case 'message reaction remove':
    //     return {
    //       reaction: ctx.args[0],
    //       user: ctx.args[1]
    //     } as MessageReactionRemoveEvent
    //
    //   case 'message reaction remove all':
    //     return { message: ctx.args[0] } as MessageReactionRemoveAllEvent
    //
    //   case 'message reaction remove emoji':
    //     return { reaction: ctx.args[0] } as MessageReactionRemoveEmojiEvent
    //
    //   case 'message update':
    //     return {
    //       oldMessage: ctx.args[0],
    //       newMessage: ctx.args[1]
    //     } as MessageUpdateEvent
    //
    //   case 'presence update':
    //     return {
    //       oldPresence: ctx.args[0],
    //       newPresence: ctx.args[1]
    //     } as PresenceUpdateEvent
    //
    //   case 'rate limit':
    //     return ctx.args[0].rateLimitInfo as RateLimitEvent
    //
    //   case 'ready':
    //     return {} as ReadyEvent
    //
    //   case 'role create':
    //     return { role: ctx.args[0] } as RoleCreateEvent
    //
    //   case 'role delete':
    //     return { role: ctx.args[0] } as RoleDeleteEvent
    //
    //   case 'role update':
    //     return { oldRole: ctx.args[0], newRole: ctx.args[1] } as RoleUpdateEvent
    //
    //   case 'shard disconnect':
    //     return { event: ctx.args[0], id: ctx.args[1] } as ShardDisconnectEvent
    //
    //   case 'shard error':
    //     return { error: ctx.args[0], id: ctx.args[1] } as ShardErrorEvent
    //
    //   case 'shard ready':
    //     return {
    //       id: ctx.args[0],
    //       unavailableGuilds: ctx.args[1]
    //     } as ShardReadyEvent
    //
    //   case 'shard reconnecting':
    //     return { id: ctx.args[0] } as ShardReconnectingEvent
    //
    //   case 'shard resume':
    //     return {
    //       id: ctx.args[0],
    //       replayedEvents: ctx.args[1]
    //     } as ShardResumeEvent
    //
    //   case 'typing start':
    //     return { channel: ctx.args[0], user: ctx.args[1] } as TypingStartEvent
    //
    //   case 'user update':
    //     return { oldUser: ctx.args[0], newUser: ctx.args[1] } as UserUpdateEvent
    //
    //   case 'voice state update':
    //     return {
    //       oldState: ctx.args[0],
    //       newState: ctx.args[1]
    //     } as VoiceStateUpdateEvent
    //
    //   case 'warn':
    //     return { info: ctx.args[0] } as WarnEvent
    //
    //   case 'webhook update':
    //     return { channel: ctx.args[0] } as WebhookUpdateEvent
    // }
    //
    // throw new Error('Invalid event!')
  }
}

export const Event = createArgumentDecorator(EventArgument)()
