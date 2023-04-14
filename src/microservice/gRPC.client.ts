import * as grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import 'dotenv/config';
import { join } from 'path';
import { ProtoGrpcType } from '../proto/kitty_chan';

const PROTO_PATH = join(__dirname, '../proto/kitty_chan.proto');
const packageDefinition = loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(
  packageDefinition,
) as unknown as ProtoGrpcType;

export const KittyChanGrpc = new proto.kitty_chan.EventsService(
  process.env.KITTY_CHAN_GRPC_URL,
  grpc.credentials.createInsecure(),
);
