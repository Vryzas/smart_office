import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerRequest: { name: string; password: string; email: string },
  ) {
    // TODO: create session?!
    try {
      const a = await this.authService.registerUser(registerRequest);
      console.log(a);
      return a;
    } catch (e) {
      // TODO: handle errors/exceptions
      console.log(e);
      return { status: new BadRequestException().getStatus(), message: e };
    }
  }

  @Post('login')
  async login(@Body() authenticateRequest: { name: string; password: string }) {
    try {
      return await this.authService.authenticateUser(authenticateRequest);
    } catch (e) {
      return {
        status: new BadRequestException().getStatus(),
        message: e.message,
      };
      // throw new BadRequestException();
    }
  }
}
