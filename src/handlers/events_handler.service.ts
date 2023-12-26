import { injectable } from 'inversify';
import {
  IBasicGuild,
  IGuildMember,
  IGuildMemberUpdate,
  IGuildMessage,
  IGuildPresence,
  IMessageDelete,
  IMessageReaction,
  IMessageUpdate,
} from '../interface/discord.interface';
import { KittyChanGrpc } from '../microservice/gRPC.client';

@injectable()
export class EventsHandler {
  /**New Discord Message */
  async messageCreate(guildMessage: IGuildMessage) {
    return KittyChanGrpc.messageCreate(guildMessage as any, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  }

  /**Edit Discord Message */
  async messageUpdate(guildMessage: IMessageUpdate) {
    return KittyChanGrpc.messageUpdate(guildMessage as any, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  }

  /**Delete Discord Message */
  async messageDelete(guildMessage: IMessageDelete) {
    return KittyChanGrpc.messageDelete(guildMessage as any, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  }

  /**Add Message Reaction */
  async messageReactionAdd(messageReaction: IMessageReaction) {
    KittyChanGrpc.messageReactionAdd(messageReaction as any, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
    return;
  }

  /**Remove Message Reaction */
  async messageReactionRemove(messageReaction: IMessageReaction) {
    KittyChanGrpc.messageReactionRemove(messageReaction as any, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
    return;
  }

  /**Guild Create */
  async guildCreate(guild: IBasicGuild) {
    KittyChanGrpc.guildCreate(guild as any, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
    return;
  }

  /**Guild Create */
  async guildUpdate(guild: IBasicGuild) {
    KittyChanGrpc.guildUpdate(guild as any, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
    return;
  }

  /**Guild Delete */
  async guildDelete(guild: IBasicGuild) {
    KittyChanGrpc.guildDelete(guild as any, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
    return;
  }

  /**Guild Member Create */
  async guildMemberCreate(guildMember: IGuildMember) {
    KittyChanGrpc.guildMemberCreate(guildMember as any, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
    return;
  }

  /**Guild Member Delete */
  async guildMemberRemove(guildMember: IGuildMember) {
    KittyChanGrpc.guildMemberRemove(guildMember as any, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
    return;
  }

  /**Guild Member Update */
  async guildMemberUpdate(guildMember: IGuildMemberUpdate) {
    KittyChanGrpc.guildMemberUpdate(guildMember as any, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
    return;
  }

  /**Guild Presence Update */
  async guildPresenceUpdate(guildPresence: IGuildPresence) {
    KittyChanGrpc.guildPresenceUpdate(guildPresence as any, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
    return;
  }
}
