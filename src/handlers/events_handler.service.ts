import { injectable } from 'inversify';
import { IBasicGuild, IGuild, IGuildMember, IMessageReaction } from '../interface/discord.interface';
import { KittyChanGrpc } from '../microservice/gRPC.client';

@injectable()
export class EventsHandler{
	constructor() { }
    
	/**New Discord Message */
	async messageCreate(guild: IGuild) {
		KittyChanGrpc.messageCreate(guild as any, (err) => { 
			if (err) {
				console.log(err);
			}
		});
		return;
	}

	/**Add Message Reaction */
	async messageReactionAdd(messageReaction: IMessageReaction) {
		KittyChanGrpc.messageReactionAdd(messageReaction as any, (err) => { 
			if (err) {
				console.log(err);
			}
		});
		return;
	}
	
	/**Remove Message Reaction */
	async messageReactionRemove(messageReaction: IMessageReaction) {
		KittyChanGrpc.messageReactionRemove(messageReaction as any, (err) => { 
			if (err) {
				console.log(err);
			}
		});
		return;
	}

	/**Guild Create */
	async guildCreate(guild: IBasicGuild) {
		KittyChanGrpc.guildCreate(guild as any, (err) => { 
			if (err) {
				console.log(err);
			}
		});
		return;
	}

	/**Guild Delete */
	async guildDelete(guild: IBasicGuild) {
		KittyChanGrpc.guildDelete(guild as any, (err) => { 
			if (err) {
				console.log(err);
			}
		});
		return;
	}


	/**Guild Member Create */
	async guildMemberAdd(guildMember: IGuildMember) {
		KittyChanGrpc.guildMemberAdd(guildMember as any, (err) => { 
			if (err) {
				console.log(err);
			}
		});
		return;
	}

	/**Guild Member Delete */
	async guildMemberRemove(guildMember: IGuildMember) {
		KittyChanGrpc.guildMemberRemove(guildMember as any, (err) => { 
			if (err) {
				console.log(err);
			}
		});
		return;
	}
}