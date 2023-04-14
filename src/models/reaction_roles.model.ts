import { getModelForClass, prop } from '@typegoose/typegoose';

export class ReactionRole {
  @prop()
  name: string;

  @prop()
  guildId: string;

  @prop()
  channelId: string;

  @prop({ type: Array<any> })
  rolesMapping: string[];

  @prop()
  messageId: string;
}

export const ReactionRoleModel = getModelForClass(ReactionRole);
