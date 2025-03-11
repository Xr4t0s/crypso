import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema, Wallet, WalletSchema } from './schemas/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [MongooseModule.forFeature([
		{ name: User.name, schema: UserSchema },
		{ name: Wallet.name, schema: WalletSchema }
	])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // ⚡️ Pour que AuthModule puisse utiliser UsersService
})
export class UsersModule {}
