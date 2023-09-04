import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-auth.input';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Public()
  create(@Body() loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
