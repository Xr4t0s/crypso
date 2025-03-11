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

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return { email: user.email };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
	
	async validateWallet(address: string): Promise<any | null> {
		if (!address) return;
		const user = await this.usersService.findByWallet(address);
		if (user) return { address: user.address}
	}

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { email: user.email };
    return { access_token: this.jwtService.sign(payload) };
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
