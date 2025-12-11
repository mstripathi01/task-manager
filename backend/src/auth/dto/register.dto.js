const { IsEmail, IsString, MinLength } = require('class-validator');

class RegisterDto {
  @IsEmail()
  email;

  @IsString()
  @MinLength(6)
  password;
}

module.exports = { RegisterDto };
