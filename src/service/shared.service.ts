import { Guild, GuildMember, Message, MessageReaction, User } from 'discord.js';
import { injectable } from 'inversify';
import {
  IBasicGuild,
  IEmoji,
  IGuild,
  IGuildMember,
  IMessageReaction,
} from '../interface/discord.interface';

@injectable()
export class SharedService {
  ////Extract users and channel info
  extractGuildInfo(content: Message) {
    const guild = new IGuild(
      content.guildId,
      content.guild.name,
      content.channelId,
      content.id,
      content.author.id,
      content.author.username,
      content.author.avatar,
      content.content,
      content.author.bot,
      content,
      {},
    );

    return guild;
  }

  ///Extract basic guild info
  extractBasicGuildInfo(guild: Guild) {
    const basicGuild: IBasicGuild = {
      guildId: guild.id,
      guildName: guild.name,
    };
    return basicGuild;
  }

  ///Extract Message and Guild from reaction
  extractMessageReactionInfo(content: MessageReaction, user: User) {
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
  extractGuildMember(member: GuildMember) {
    const guildMember: IGuildMember = {
      guildId: member.guild.id,
      userId: member.user.id,
    };
    return guildMember;
  }

  ////Extract Info from raw events
  extractMessageReactionFromRaw(event) {
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
