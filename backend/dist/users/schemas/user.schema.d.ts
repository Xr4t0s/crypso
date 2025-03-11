import { Document } from 'mongoose';
export declare class User extends Document {
    email: string;
    password: string;
}
export declare class Wallet extends Document {
    address: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const WalletSchema: import("mongoose").Schema<Wallet, import("mongoose").Model<Wallet, any, any, any, Document<unknown, any, Wallet> & Wallet & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Wallet, Document<unknown, {}, import("mongoose").FlatRecord<Wallet>> & import("mongoose").FlatRecord<Wallet> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
