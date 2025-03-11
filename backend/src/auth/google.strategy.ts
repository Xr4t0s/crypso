import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    console.log('GOOGLE_CLIENT_ID:', configService.get<string>('GOOGLE_CLIENT_ID'));
    console.log('GOOGLE_CLIENT_SECRET:', configService.get<string>('GOOGLE_CLIENT_SECRET'));
    console.log('GOOGLE_CALLBACK_URL:', configService.get<string>('GOOGLE_CALLBACK_URL'));

    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
      passReqToCallback: false, // 🔥 Ajoute cette ligne pour éviter l'erreur
    } as StrategyOptions);
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    const user = {
      googleId: profile.id,
      email: profile.emails[0].value,
      displayName: profile.displayName,
      avatar: profile.photos[0].value,
    };
    done(null, user);
  }
}
