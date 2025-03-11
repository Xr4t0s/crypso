import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
	ConfigModule.forRoot({ isGlobal: true }),
	MongooseModule.forRoot(process.env.MONGO_URI || "mongodb+srv://Kr4t0s4s:YlH0MxHKiBakkeSe@cluster0.hjapm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"),
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController], // ✅ Doit inclure le contrôleur d'authentification
  providers: [AuthService, JwtStrategy], // ✅ Doit inclure le service d'authentification
  exports: [AuthService], // ✅ Nécessaire pour que d'autres modules puissent utiliser AuthService
})
export class AuthModule {}
