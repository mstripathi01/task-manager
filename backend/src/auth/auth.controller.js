const { Controller, Post, Req } = require('@nestjs/common');
const { AuthService } = require('./auth.service');

@Controller('auth')
class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  @Post('register')
  async register(req) {
    const { email, password } = req.body;
    return this.authService.register(email, password);
  }

  @Post('login')
  async login(req) {
    const { email, password } = req.body;
    return this.authService.login(email, password);
  }
}

AuthController.inject = [AuthService];
module.exports = { AuthController };
