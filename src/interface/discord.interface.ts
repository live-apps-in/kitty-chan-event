import { Message } from 'discord.js';

export class IGuild{
	constructor(
        public guildId?: string,
        public guildName?: string,
        public channelId?: string,
        public messageId?: string,
        public userId?: string,
        public username?: string,
        public avatar?: string,
        public messageContent?: string,
        public isBot?: boolean,
        public payload?: Message,
        public featureFlag?: any,
	){}
}
export class IGuildMember{
	constructor(
        public guildId?: string,
        public userId?: string,
	){}
}

/**Discord Message Reaction */
export interface IMessageReaction{
        guildId?: string,
        channelId?: string,
        messageId?: string,
        userId?: string,
        messageContent?: string,
        isBot?: boolean,
        emoji?: IEmoji,
        payload?: Message,
}

/**Discord Emoji */
export interface IEmoji{
        name: string,
        id: string,
        animated: boolean,
        createdAt?: Date
}