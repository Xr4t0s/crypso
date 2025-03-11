import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    walletLogin(body: {
        address: string;
    }): Promise<{
        access_token: string;
    }>;
    validateWallet(body: {
        address: string;
    }): Promise<{
        message: string;
        wallet?: undefined;
        user?: undefined;
    } | {
        message: string;
        wallet: any;
        user?: undefined;
    } | {
        user: import("../users/schemas/user.schema").Wallet;
        message?: undefined;
        wallet?: undefined;
    }>;
    validateToken(req: any): Promise<{
        valid: boolean;
        user: any;
    }>;
}
