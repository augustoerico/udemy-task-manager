import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private repository: UsersRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(dto: AuthCredentialsDto): Promise<User> {
        const user = await this.repository.findOne({ username: dto.username });
        if (user) {
            const message = 'username already taken';
            throw new ConflictException(message);
        }
        return this.repository.createUser(dto);
    }

    async signIn(dto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = dto;
        const user = await this.repository.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username };
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken: accessToken };
        } else {
            const message = 'Unauthorized. Please check your login';
            throw new UnauthorizedException(message);
        }
    }
}
