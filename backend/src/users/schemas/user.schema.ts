import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Wallet extends Document {
	@Prop({ required: true, unique: true})
	address: string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);