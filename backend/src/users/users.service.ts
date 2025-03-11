import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Wallet } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
		@InjectModel(Wallet.name) private walletModel: Model<Wallet>
	) {}	


	async findByWallet(address: string): Promise<Wallet | null> {
		return this.walletModel.findOne({ address: address }).exec();
	}

	async createUserByWallet(address: string): Promise<Wallet> {
		console.log(address)
		let existingUser = await this.walletModel.findOne({ address })
		if (!existingUser) {
			existingUser = await this.walletModel.findOne({ address })
		}
		return this.walletModel.create({ address })
	}
}
