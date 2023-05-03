import { Attachment, Collection, Message, MessageMentions } from 'discord.js';

/**Message */
export class IGuildMessage {
  public guildId?: string;
  public guildName?: string;
  public channelId?: string;
  public messageId?: string;
  public userId?: string;
  public username?: string;
  public avatar?: string;
  public messageContent?: string;
  public mentions?: IMessageMentions;
  public attachments?: Collection<string, Attachment>;
  public isBot?: boolean;
  public payload?: Message;
}

export class IMessageMentions {
  public hasMention?: boolean;
  public everyone?: boolean;
  public users?: IMessageMentionsUser[];
  public roles?: IMessageMentionsRole[];
}

export class IMessageMentionsUser {
  public userId?: string;
}
export class IMessageMentionsRole {
  public roleId?: string;
}

/**Guild */
export class IBasicGuild {
  guildId?: string;
  guildName?: string;
}

export class IGuildMember {
  public guildId?: string;
  public userId?: string;
}

/**Discord Message Reaction */
export interface IMessageReaction {
  guildId?: string;
  channelId?: string;
  messageId?: string;
  userId?: string;
  messageContent?: string;
  isBot?: boolean;
  emoji?: IEmoji;
  payload?: Message;
}

/**Discord Emoji */
export interface IEmoji {
  name: string;
  id: string;
  animated: boolean;
  createdAt?: Date;
}
