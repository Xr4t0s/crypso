import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateWallet(address: string): Promise<any | null>;
    walletLogin(address: string): Promise<{
        access_token: string;
    }>;
    generateJwt(user: any): string;
}
