
import { Controller, Request,Get, Post, UseGuards, Options,Header } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

@Controller('api')
export class AppController {
  constructor(private readonly authService: AuthService, private usersService:UsersService) {}

 @Get() 
async getHello() {
  return 'Hello World!'
}

  @Post('auth/login')
  @Header('Access-Control-Allow-Origin', '*')
  @UseGuards(AuthGuard('local')) 
  async login(@Request() req) {
    
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  

}