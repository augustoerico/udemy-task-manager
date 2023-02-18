import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private repository: UsersRepository,
    ) {}

    async signUp(dto: AuthCredentialsDto): Promise<void> {
        await this.repository.createUser(dto);
    }

    async signIn(dto: AuthCredentialsDto): Promise<string> {
        const { username, password } = dto;
        const user = await this.repository.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            return 'success';
        } else {
            const message = 'Unauthorized. Please check your login';
            throw new UnauthorizedException(message);
        }
    }
}
