import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async createUser(dto: AuthCredentialsDto) {
        const { username, password } = dto;

        const salt = await bcrypt.genSalt();
        const hPassword = await bcrypt.hash(password, salt);

        const user = this.create({ username, password: hPassword });

        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('username already taken');
            } else {
                console.error(error);
                throw error;
            }
        }
    }
}
