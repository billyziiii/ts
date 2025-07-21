import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private jwtService;
    private prisma;
    constructor(jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        username: string;
        id: string;
        coinBalance: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
