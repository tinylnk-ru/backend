import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(dto: RegisterDto): Promise<User> {

    console.log(dto);

    const existingUser = await this.userRepository.findOne({ where: { email: dto.email } });

    if (existingUser)
      throw new ConflictException(`Email already in use: ${dto.email}`);

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      passwordHash,
      role: 'user',
    });

    return this.userRepository.save(user);
  }
}
