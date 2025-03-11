import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
	
	async validateWallet(address: string): Promise<any | null> {
		if (!address) return;
		const user = await this.usersService.findByWallet(address);
		if (user) return { address: user.address}
	}

	async walletLogin(address: string) {
		const user = await this.validateWallet(address)
		const payload = { address: address}
		return { access_token: this.jwtService.sign(payload) }
	}

  generateJwt(user: any): string {
    const payload = { sub: user.googleId, email: user.email };
    return this.jwtService.sign(payload);
  }
}
