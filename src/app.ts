import 'dotenv/config';
import { Client } from '@live-apps/discord';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { DI_TYPES } from './core/inversify/types.di';
import { EventsHandler } from './handlers/events_handler.service';
import { SharedService } from './service/shared.service';
import { DiscordEvents } from '@live-apps/discord/dist/shared/enum/events.enum';
import { ActivityType, Guild, GuildMember } from 'discord.js';

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
    DiscordEvents.guildUpdate,
    DiscordEvents.messageDelete,
    DiscordEvents.messageUpdate,
    DiscordEvents.raw,
  ],
  sync: false,
  token: process.env.KITTY_CHAN_TOKEN,
});

@injectable()
export class App {
  constructor(
    @inject(DI_TYPES.SharedService)
    private readonly sharedService: SharedService,
    @inject(DI_TYPES.EventsHandler)
    private readonly eventsHandler: EventsHandler,
  ) {}

  async start() {
    /**
     * On client bootstrap
     */
    client.on('ready', async () => {
      client.bot.setActivity(`people's wishes!`, ActivityType.Listening);
      console.log('kitty chan connected 😸');

      ///Currently static
      setInterval(() => {
        client.bot.setActivity(`people's wishes!`, ActivityType.Listening);
      }, 60000);
    });

    /**
     * Message Create Event
     *
     */
    client.on('messageCreate', async (message) => {
      const guildInfo = this.sharedService.extractGuildInfo(message);
      this.eventsHandler.messageCreate(guildInfo);
      return;
    });

    /**
     * Extract required actions from raw event
     */
    client.on('raw', async (event) => {
      //Message Reaction Add
      if (event.t === 'MESSAGE_REACTION_ADD') {
        const messageReaction =
          this.sharedService.extractMessageReactionFromRaw(event);
        this.eventsHandler.messageReactionAdd(messageReaction);
        return;
      }

      //Message Reaction Remove
      if (event.t === 'MESSAGE_REACTION_REMOVE') {
        const messageReaction =
          this.sharedService.extractMessageReactionFromRaw(event);
        this.eventsHandler.messageReactionRemove(messageReaction);
        return;
      }
    });

    /**
     * Guild Create Event
     */
    client.on('guildCreate', async (guild: Guild) => {
      const basicGuildInfo = this.sharedService.extractBasicGuildInfo(guild);
      this.eventsHandler.guildCreate(basicGuildInfo);
      return;
    });

    /**
     * Guild Delete Event
     */
    client.on('guildDelete', async (guild) => {
      const basicGuildInfo = this.sharedService.extractBasicGuildInfo(guild);
      this.eventsHandler.guildDelete(basicGuildInfo);
      return;
    });

    /**
     * User Joining Guild
     */
    client.on('guildMemberAdd', (member: GuildMember) => {
      const guildMember = this.sharedService.extractGuildMember(member);
      this.eventsHandler.guildMemberAdd(guildMember);
    });

    /**User Leaving Guild */
    client.on('guildMemberRemove', (member: GuildMember) => {
      const guildMember = this.sharedService.extractGuildMember(member);
      this.eventsHandler.guildMemberRemove(guildMember);
    });
  }
}
