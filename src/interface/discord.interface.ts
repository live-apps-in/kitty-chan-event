import { Message } from 'discord.js';

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
  public attachments?: IMessageAttachments[];
  public isBot?: boolean;
}

/**Guild Message Update */
export class IMessageUpdate {
  public guildId?: string;
  public channelId?: string;
  public messageId?: string;
  public userId?: string;
  public username?: string;
  public avatar?: string;
  public oldMessage?: string;
  public newMessage?: string;
  public createdAt?: string;
  public editedAt?: string;
  public isBot?: boolean;
}

/**Guild Message Delete */
export class IMessageDelete {
  public guildId?: string;
  public channelId?: string;
  public messageId?: string;
  public userId?: string;
  public username?: string;
  public avatar?: string;
  public message?: string;
  public createdAt?: string;
  public editedAt?: string;
  public isBot?: boolean;
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

export class IMessageAttachments {
  public name: string;
  public id: string;
  public size: number;
  public url: string;
  public proxyURL: string;
  public height: number;
  public width: number;
  public contentType: string;
  public description: string;
  public ephemeral: boolean;
}

/**Guild */
export class IBasicGuild {
  guildId?: string;
  guildName?: string;
}

export class IGuildMember {
  public guildId?: string;
  public guildName?: string;
  public userId?: string;
  public userName?: string;
}
export class IGuildMemberUpdate {
  public guildId?: string;
  public userId?: string;
  public username?: string;
  public nickname?: string;
  public avatar?: string;
  public roles?: string[];
  public isBot?: boolean;
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
