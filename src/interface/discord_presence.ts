import { Presence } from 'discord.js';

export interface DiscordPresenceEvent {
  oldPresence: Presence;
  newPresence: Presence;
}
