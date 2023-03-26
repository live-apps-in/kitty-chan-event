import { connect } from 'mongoose';
import 'dotenv/config';

const MONGO_URI = process.env.MONGO_URI;
connect(MONGO_URI)
	.then(res=> console.log('MongoDB Connected'));