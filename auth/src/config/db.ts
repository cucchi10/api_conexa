import { dbUri } from './config';
import { connect } from 'mongoose';



export default async function dbConnect(): Promise<void> {
  await connect(dbUri);
}