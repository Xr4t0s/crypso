import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ✅ Importation de ConfigModule
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ Rend ConfigService accessible globalement
    UsersModule,
    PassportModule.register({ defaultStrategy: 'google' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy], // ✅ Ajoute GoogleStrategy
  exports: [AuthService],
})
export class AuthModule {}
