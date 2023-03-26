import { ShardingManager } from 'discord.js';
import { join } from 'path';

const manager = new ShardingManager(join(__dirname, '../../app.ts'), {
	token: process.env.KITTY_CHAN_TOKEN,
	totalShards: 'auto'
});

manager.spawn();

manager.on('shardCreate', (shard) => {
	console.log(`Created shard ${shard.id}`);
});