import { injectable } from 'inversify';
import { IGuild } from '../interface/discord.interface';
import { KittyChanGrpc } from '../microservice/gRPC.client';

@injectable()
export class EventsHandler{
	constructor() { }
    
	/**New Discord Message */
	async messageCreate(guild: IGuild) {
		guild.payload = JSON.stringify(guild.payload) as any;
		KittyChanGrpc.messageCreate(guild as any, (err, res) => { 
			if (err) {
				console.log(err);
			}
		});
	}
	async messageReactionAdd() {
        
	}
}