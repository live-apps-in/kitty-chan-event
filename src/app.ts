import 'reflect-metadata';
import 'dotenv/config';
import { Client } from '@live-apps/discord';
import { inject, injectable } from 'inversify';
import { DI_TYPES } from './core/inversify/types.di';
import { EventsHandler } from './handlers/events_handler.service';
import { DiscordEventsProcessor } from './service/discord-events-processor';
import { DiscordEvents } from '@live-apps/discord';
import { ActivityType, Guild, GuildMember, Message } from 'discord.js';
import { DiscordPresenceEvent } from './interface/discord_presence';

/**
 * LiveApps Discord Client Config
 */
export const client = new Client({
  events: [
    DiscordEvents.guildCreate,
    DiscordEvents.guildDelete,
    DiscordEvents.messageCreate,
    DiscordEvents.guildMemberAdd,
    DiscordEvents.guildMemberRemove,
    DiscordEvents.guildMemberUpdate,
    DiscordEvents.guildUpdate,
    DiscordEvents.messageDelete,
    DiscordEvents.messageUpdate,
    DiscordEvents.presenceUpdate,
    DiscordEvents.raw,
  ],
  redisOptions: {
    host: process.env.REDIS_HOST,
    db: 0,
    port: 6379,
    pass: process.env.REDIS_PASS,
  },
  token: process.env.KITTY_CHAN_TOKEN,
});

@injectable()
export class App {
  constructor(
    @inject(DI_TYPES.DiscordEventsProcessor)
    private readonly eventsProcessor: DiscordEventsProcessor,
    @inject(DI_TYPES.EventsHandler)
    private readonly eventsHandler: EventsHandler,
  ) {}

  async start() {
    /**
     * On client bootstrap
     */
    try {
      client.on('ready', async () => {
        client.bot.setActivity(`with my 9 lives!`, ActivityType.Playing);
        console.log('kitty chan connected 😸');
      });

      /**
       * Message Create Event
       *
       */
      client.on('messageCreate', async (message: Message) => {
        const guildMessage = this.eventsProcessor.buildGuildMessage(message);
        return this.eventsHandler.messageCreate(guildMessage);
      });

      /**
       * Message Update Event
       *
       */
      client.on('messageUpdate', async (message: Message) => {
        const guildMessage = this.eventsProcessor.buildMessageUpdate(message);
        return this.eventsHandler.messageUpdate(guildMessage);
      });

      /**
       * Message Delete Event
       *
       */
      client.on('messageDelete', async (message: Message) => {
        const guildMessage = this.eventsProcessor.buildMessageDelete(message);
        return this.eventsHandler.messageDelete(guildMessage);
      });

      /**
       * Extract required actions from raw event
       */
      client.on('raw', async (event) => {
        //Message Reaction Add
        if (event.t === 'MESSAGE_REACTION_ADD') {
          const messageReaction =
            this.eventsProcessor.buildMessageReactionFromRaw(event);

          return this.eventsHandler.messageReactionAdd(messageReaction);
        }

        //Message Reaction Remove
        if (event.t === 'MESSAGE_REACTION_REMOVE') {
          const messageReaction =
            this.eventsProcessor.buildMessageReactionFromRaw(event);

          return this.eventsHandler.messageReactionRemove(messageReaction);
        }

        /**Update Guild User
         * Avatar, Roles, Nickname
         */
        if (event.t === 'GUILD_MEMBER_UPDATE') {
          const guildMember =
            this.eventsProcessor.buildGuildMemberUpdateFromRaw(event);

          return this.eventsHandler.guildMemberUpdate(guildMember);
        }
      });

      /**
       * Guild Create Event
       */
      client.on('guildCreate', async (guild: Guild) => {
        const basicGuildInfo = this.eventsProcessor.buildBasicGuildInfo(guild);

        return this.eventsHandler.guildCreate(basicGuildInfo);
      });

      /**
       * Guild Update Event
       */
      client.on('guildUpdate', async (guild: Guild) => {
        const basicGuildInfo = this.eventsProcessor.buildBasicGuildInfo(guild);

        return this.eventsHandler.guildUpdate(basicGuildInfo);
      });

      /**
       * Guild Delete Event
       */
      client.on('guildDelete', async (guild) => {
        const basicGuildInfo = this.eventsProcessor.buildBasicGuildInfo(guild);

        return this.eventsHandler.guildDelete(basicGuildInfo);
      });

      /**
       * User Joining Guild
       */
      client.on('guildMemberAdd', (member: GuildMember) => {
        const guildMember = this.eventsProcessor.buildGuildMember(member);

        return this.eventsHandler.guildMemberCreate(guildMember);
      });

      /**User Leaving Guild */
      client.on('guildMemberRemove', (member: GuildMember) => {
        const guildMember = this.eventsProcessor.buildGuildMember(member);

        return this.eventsHandler.guildMemberRemove(guildMember);
      });

      /**
       * Guild Presence Update
       */
      client.on(
        'presenceUpdate',
        async (presenceUpdate: DiscordPresenceEvent) => {
          const guildPresence =
            this.eventsProcessor.buildGuildPresenceUpdate(presenceUpdate);

          return this.eventsHandler.guildPresenceUpdate(guildPresence);
        },
      );
    } catch (error) {
      console.log(`LiveApps Discord Client Error - ${error}`);
    }
  }
}
