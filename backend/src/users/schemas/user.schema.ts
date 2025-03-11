import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

@Schema()
export class Wallet extends Document {
	@Prop({ required: true, unique: true})
	address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const WalletSchema = SchemaFactory.createForClass(Wallet);