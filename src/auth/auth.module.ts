import { Module } from '@nestjs/common';
import { AuthConfig } from './auth.config';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, AuthConfig],
})
export class AuthModule {}
