import { Model } from 'mongoose';
import { Wallet } from './schemas/user.schema';
export declare class UsersService {
    private walletModel;
    constructor(walletModel: Model<Wallet>);
    findByWallet(address: string): Promise<Wallet | null>;
    createUserByWallet(address: string): Promise<Wallet>;
}
