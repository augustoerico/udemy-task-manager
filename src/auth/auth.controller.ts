import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body() dto: AuthCredentialsDto): Promise<User> {
        return await this.authService.signUp(dto);
    }

    @Post('/signin')
    async signIn(
        @Body() dto: AuthCredentialsDto,
    ): Promise<{ accessToken: string }> {
        return await this.authService.signIn(dto);
    }
}
