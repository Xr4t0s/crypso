import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    validateWallet(address: string): Promise<any | null>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
    walletLogin(address: string): Promise<{
        access_token: string;
    }>;
    generateJwt(user: any): string;
}
