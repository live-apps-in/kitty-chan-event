import { ActivityType, Client, GatewayIntentBits, Guild, GuildMember, MessageReaction, User } from 'discord.js';
import 'dotenv/config';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { DI_TYPES } from './core/inversify/types.di';
import { EventsHandler } from './handlers/events_handler.service';
import { SharedService } from './service/shared.service';

/**
 * Discord JS Client Config
 */
export const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
	],
	shards: 'auto',
});

@injectable()
export class App{
	constructor(
		@inject(DI_TYPES.SharedService) private readonly sharedService: SharedService,
		@inject(DI_TYPES.EventsHandler) private readonly EventsHandler: EventsHandler,
	){}

	async start() {
		/**
		 * On client bootstrap
		 */
		client.on('ready', async() => {
			client.user.setActivity('people\'s wishes!', { type: ActivityType.Listening});
			console.log('kitty chan connected 😸');
			
			///Currently static
			setInterval(() => {
				client.user.setActivity('people\'s wishes!', { type: ActivityType.Listening});
			},60000);	
		});

        
		/**
		 * Message Create Event
		 * 
		 */
		client.on('messageCreate', async (message) => {
			///Extract Guild Info
			const guildInfo = this.sharedService.extractGuildInfo(message);
			this.EventsHandler.messageCreate(guildInfo);
			return;
		});
  

		/**
		 * Message Reaction Add Event
		 */
		client.on('messageReactionAdd', async (reaction: MessageReaction, user: User) => {
			///Extract Message Info
			const messageReaction = this.sharedService.extractMessageReactionInfo(reaction, user);
			this.EventsHandler.messageReactionAdd(messageReaction);
			return;
		});

		/**
		 * Message Reaction Remove
		 */
		client.on('messageReactionRemove', async (reaction: MessageReaction, user: User) => { 
			///Extract Message Info
			const messageReaction = this.sharedService.extractMessageReactionInfo(reaction, user);
			this.EventsHandler.messageReactionRemove(messageReaction);
			return;
		});


		/**
		 * Guild Create Event
		 */
		client.on('guildCreate', async (guild: Guild) => {
			const basicGuildInfo = this.sharedService.extractBasicGuildInfo(guild);
			this.EventsHandler.guildCreate(basicGuildInfo);
			return;
		});


		/**
		 * Guild Delete Event
		 */
		client.on('guildDelete', async (guild) => {
			const basicGuildInfo = this.sharedService.extractBasicGuildInfo(guild);
			this.EventsHandler.guildDelete(basicGuildInfo);
			return;
		});

		/**
		 * User Joining Guild
		 */
		client.on('guildMemberAdd', (member: GuildMember) => {
			const guildMember = this.sharedService.extractGuildMember(member);
			this.EventsHandler.guildMemberAdd(guildMember);
		});

		/**User Leaving Guild */
		client.on('guildMemberRemove', (member: GuildMember) => {
			const guildMember = this.sharedService.extractGuildMember(member);
			this.EventsHandler.guildMemberRemove(guildMember);
		});

		///Login kitty chan
		client.login(process.env.KITTY_CHAN_TOKEN);
	}
}
