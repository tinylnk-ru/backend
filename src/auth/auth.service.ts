import { Body, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
        const user = await this.userRepository.findOne({
            where: {
                email: loginDto.email
            }
        });

        if (!user || !(await bcrypt.compare(loginDto.password, user.passwordHash))) {
            throw new ConflictException('Invalid credentials');
        }

        const payload = { email: user.email, name: user.name, sub: user.id };

        return { accessToken: this.jwtService.sign(payload) };
    }

    async register(dto: RegisterDto): Promise<User> {
        const existingUser = await this.userRepository.findOne({
            where: { email: dto.email },
        });

        if (existingUser) {
            throw new ConflictException(`Email already in use: ${dto.email}`);
        }

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
