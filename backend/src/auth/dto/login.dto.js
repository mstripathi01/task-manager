const { IsEmail, IsString } = require('class-validator');

class LoginDto {
  @IsEmail()
  email;

  @IsString()
  password;
}

module.exports = { LoginDto };
