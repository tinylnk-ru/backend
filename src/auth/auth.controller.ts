import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  sayHi(): string {
    return 'Hi'
  }

  @Post('register')
  async registerUser(@Body() registerDto: RegisterDto): Promise<User> {
    return await this.authService.register(registerDto);
  }
}
