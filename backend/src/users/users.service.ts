import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, Wallet } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
		@InjectModel(User.name) private userModel: Model<User>,
		@InjectModel(Wallet.name) private walletModel: Model<Wallet>
	) {}	

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

	async findByWallet(address: string): Promise<Wallet | null> {
		return this.walletModel.findOne({ address: address }).exec();
	}

  async createUserByEmail(username: string, email: string, password: string): Promise<User> {
	let existingUser = await this.userModel.findOne({ email });
	if (!existingUser) {
		existingUser = await this.userModel.findOne({ username });
	}
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userModel.create({ email, password: hashedPassword });
  }

	async createUserByWallet(address: string): Promise<Wallet> {
		console.log(address)
		let existingUser = await this.userModel.findOne({ address })
		if (!existingUser) {
			existingUser = await this.userModel.findOne({ address })
		}
		return this.walletModel.create({ address })
	}
}
