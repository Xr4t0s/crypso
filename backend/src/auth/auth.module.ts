import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // ✅ Importation de ConfigModule
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ Rend ConfigService accessible globalement
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // ✅ Ajoute GoogleStrategy
  exports: [AuthService],
})
export class AuthModule {}
