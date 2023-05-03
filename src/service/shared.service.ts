import { Guild, GuildMember, Message, MessageReaction, User } from 'discord.js';
import { injectable } from 'inversify';
import {
  IBasicGuild,
  IEmoji,
  IGuildMember,
  IGuildMessage,
  IMessageReaction,
} from '../interface/discord.interface';

@injectable()
export class SharedService {
  /**Guild Message */
  public extractGuildMessage(message: Message) {
    const { guild, mentions } = message;

    const guildMessage: IGuildMessage = {
      guildId: message.guildId,
      guildName: guild.name,
      channelId: message.channelId,
      userId: message.author.id,
      avatar: message.author.avatar,
      isBot: message.author.bot,
      messageContent: message.content,
      attachments: message.attachments,
      messageId: message.id,
      username: message.author.username,
      payload: message,
    };

    ///Map Mentions
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

    return guildMessage;
  }

  ///Extract basic guild info
  public extractBasicGuildInfo(guild: Guild) {
    const basicGuild: IBasicGuild = {
      guildId: guild.id,
      guildName: guild.name,
    };
    return basicGuild;
  }

  ///Extract Message and Guild from reaction
  public extractMessageReactionInfo(content: MessageReaction, user: User) {
    const message = content.message;
    const emoji = content.emoji;

    const messageReaction: IMessageReaction = {
      guildId: message.guildId,
      channelId: message.channelId,
      userId: user.id,
      isBot: content.me,
      messageId: message.id,
      messageContent: message.content,
      emoji: {
        animated: emoji.animated,
        id: emoji.id,
        name: emoji.name,
        createdAt: emoji.createdAt,
      } as IEmoji,
    };

    return messageReaction;
  }

  ////Extract users and channel info
  public extractGuildMember(member: GuildMember) {
    const guildMember: IGuildMember = {
      guildId: member.guild.id,
      userId: member.user.id,
    };
    return guildMember;
  }

  ////Extract Info from raw events
  public extractMessageReactionFromRaw(event) {
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
}
