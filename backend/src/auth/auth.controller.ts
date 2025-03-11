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

  @Post('signup')  
  async signup(@Body() body: { username: string, email: string; password: string }) {
    return this.usersService.createUserByEmail(body.username, body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

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

  // 🔹 Étape 1 : Endpoint pour initier la connexion Google
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return { message: 'Redirecting to Google...' };
  }

  // 🔹 Étape 2 : Endpoint appelé après la connexion Google
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req, @Res() res: Response) {
    const user = req.user;

    // Génération d'un JWT pour l'utilisateur
    const token = this.authService.generateJwt(user);

    // 🔹 Étape 3 : Redirection vers le frontend avec le token
    return res.redirect(`http://localhost:5173/dashboard?token=${token}`);
  }
}
