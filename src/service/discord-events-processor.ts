import { Guild, GuildMember, Message, MessageReaction, User } from 'discord.js';
import { injectable } from 'inversify';
import {
  IBasicGuild,
  IEmoji,
  IGuildMember,
  IGuildMemberUpdate,
  IGuildMessage,
  IGuildPresence,
  IMessageDelete,
  IMessageReaction,
  IMessageUpdate,
} from '../interface/discord.interface';
import { DiscordPresenceEvent } from '../interface/discord_presence';

@injectable()
export class DiscordEventsProcessor {
  /**Guild */
  public buildBasicGuildInfo(guild: Guild) {
    const basicGuild: IBasicGuild = {
      guildId: guild.id,
      guildName: guild.name,
      guildOwner: guild.ownerId,
      guildMembersCount: guild.memberCount,
    };
    return basicGuild;
  }

  /**Guild Message */
  public buildGuildMessage(message: Message) {
    const { guild, mentions, attachments } = message;

    const guildMessage: IGuildMessage = {
      guildId: message.guildId,
      guildName: guild.name,
      channelId: message.channelId,
      userId: message.author.id,
      avatar: message.author.avatar,
      isBot: message.author.bot,
      plainMessage: message.content,
      messageId: message.id,
      username: message.author.username,
      createdAt: message.createdAt,
    };

    ///MessageMentions
    guildMessage.mentions = { hasMention: false };
    guildMessage.mentions.everyone = mentions.everyone;
    guildMessage.mentions.users = mentions.users.map((e) => {
      return { userId: e.id };
    });
    guildMessage.mentions.roles = mentions.roles.map((e) => {
      return { roleId: e.id };
    });

    if (
      guildMessage.mentions.everyone ||
      guildMessage.mentions.users.length > 0 ||
      guildMessage.mentions.roles.length > 0
    ) {
      guildMessage.mentions.hasMention = true;
    }

    ///Message Attachments
    guildMessage.attachments = [];
    guildMessage.attachments = attachments.map((e) => {
      return { ...e };
    });

    return guildMessage;
  }

  public buildMessageUpdate(message: Message) {
    const guild = {
      guildId: message.guildId,
      channelId: message.channelId,
      messageId: message.id,
      userId: message.author.id,
      username: message.author.username,
      avatar: message.author.avatar,
      oldMessage: message.content,
      newMessage: message.reactions.message.content,
      createdAt: message.createdTimestamp.toString(),
      editedAt: message.reactions.message.editedTimestamp?.toString(),
      isBot: message.author.bot,
    } as IMessageUpdate;

    return guild;
  }

  public buildMessageDelete(message: Message) {
    const guild = {
      guildId: message.guildId,
      channelId: message.channelId,
      messageId: message.id,
      userId: message.author.id,
      username: message.author.username,
      avatar: message.author.avatar,
      message: message.content,
      createdAt: message.createdTimestamp.toString(),
      editedAt: Math.floor(Date.now() / 1000).toString(),
      isBot: message.author.bot,
    } as IMessageDelete;

    return guild;
  }

  ///Extract Message and Guild from reaction
  public buildMessageReactionInfo(content: MessageReaction, user: User) {
    const message = content.message;
    const emoji = content.emoji;

    const messageReaction: IMessageReaction = {
      guildId: message.guildId,
      channelId: message.channelId,
      userId: user.id,
      isBot: content.me,
      messageId: message.id,
      plainMessage: message.content,
      emoji: {
        animated: emoji.animated,
        id: emoji.id,
        name: emoji.name,
        createdAt: emoji.createdAt,
      } as IEmoji,
      createdAt: emoji.createdAt,
    };

    return messageReaction;
  }

  /**Guild Member */
  public buildGuildMember(member: GuildMember) {
    const guildMember: IGuildMember = {
      guildId: member.guild.id,
      guildName: member.guild.name,
      userId: member.user.id,
      userName: member.user.username,
      createdAt: member.joinedAt,
    };
    return guildMember;
  }

  public buildGuildMemberUpdateFromRaw(event) {
    const { d } = event;
    const isBot = process.env.KITTY_CHAN_ID === d.user_id;

    const guildMember: IGuildMemberUpdate = {
      guildId: d.guild_id,
      userId: d.user.id,
      username: d.user.username,
      nickname: d.nick,
      avatar: d.user.avatar,
      roles: d.roles,
      isBot,
    };
    return guildMember;
  }

  /**Guild RAW */
  public buildMessageReactionFromRaw(event) {
    const isBot = process.env.KITTY_CHAN_ID === event.d.user_id;
    const guild = {
      guildId: event.d.guild_id,
      channelId: event.d.channel_id,
      messageId: event.d.message_id,
      userId: event.d.user_id,
      emoji: event?.d?.emoji,
      isBot,
    } as IMessageReaction;

    return guild;
  }

  /**Guild Presence Update */
  public buildGuildPresenceUpdate({ newPresence }: DiscordPresenceEvent) {
    const presence = {
      guildId: newPresence.guild.id,
      userId: newPresence.userId,
      status: newPresence.status,
      activities: [],
    } as IGuildPresence;

    newPresence.activities.map((e) => {
      presence.activities.push({
        name: e.name,
        type: e.type,
        url: e.url,
        details: e.details,
        state: e.state,
        createdTimestamp: e.createdTimestamp.toString(),
      });
    });

    return presence;
  }
}
