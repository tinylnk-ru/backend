import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @MaxLength(64)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}