import { Model } from 'mongoose';
import { User, Wallet } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    private walletModel;
    constructor(userModel: Model<User>, walletModel: Model<Wallet>);
    findByEmail(email: string): Promise<User | null>;
    findByWallet(address: string): Promise<Wallet | null>;
    createUserByEmail(username: string, email: string, password: string): Promise<User>;
    createUserByWallet(address: string): Promise<Wallet>;
}
