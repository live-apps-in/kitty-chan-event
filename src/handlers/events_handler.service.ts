import { injectable } from 'inversify';
import { IGuild, IMessageReaction } from '../interface/discord.interface';
import { KittyChanGrpc } from '../microservice/gRPC.client';

@injectable()
export class EventsHandler{
	constructor() { }
    
	/**New Discord Message */
	async messageCreate(guild: IGuild) {
		KittyChanGrpc.messageCreate(guild as any, (err, res) => { 
			if (err) {
				console.log(err);
			}
		});
	}

	/**Add Message Reaction */
	async messageReactionAdd(messageReaction: IMessageReaction) {
		KittyChanGrpc.messageReactionAdd(messageReaction as any, (err, res) => { 
			if (err) {
				console.log(err);
			}
		});
	}
}