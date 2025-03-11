import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './schemas/user.schema';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([
		{ name: Wallet.name, schema: WalletSchema }
	])],
  providers: [UsersService],
  exports: [UsersService], // ⚡️ Pour que AuthModule puisse utiliser UsersService
})
export class UsersModule {}
