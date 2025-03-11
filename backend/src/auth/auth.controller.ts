import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard'; // Ajout du guard JWT
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

	@Post('walletLogin')
	async walletLogin(@Body() body: { address: string }) {
		return this.authService.walletLogin(body.address);
	}

	@Post('wallet')
	async validateWallet(@Body() body: { address: string }) {
		console.log('Requête reçue avec wallet:', body.address);

		if (!body.address) {
			console.error('Adresse wallet manquante');
			return { message: 'Adresse wallet requise' };
		}

		// Vérifie si le wallet existe déjà
		const existingWallet = await this.authService.validateWallet(body.address);
		if (existingWallet) {
			return { message: 'Wallet déjà enregistré', wallet: existingWallet };
		}

		// Crée un nouvel utilisateur avec son wallet
		const newUser = await this.usersService.createUserByWallet(body.address);
		return { user: newUser };
	}


  // 🔹 Vérification du token JWT
  @UseGuards(JwtAuthGuard) // Protège cette route avec JWT
  @Get('validate-token')
  async validateToken(@Req() req) {
    return { valid: true, user: req.user };
  }
}
