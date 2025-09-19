import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/models/user.model';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    /**
     * Validates user credentials and returns user data if valid.
     */
    async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
        return this.usersService.login(email, password);
    }

    /**
     * Logs in a user and returns JWT access and refresh tokens.
     * Access token expires in 1h, refresh token in 7d.
     */
    async login(email: string, password: string): Promise<{ access_token: string; refresh_token: string }> {
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        const access_token = this.jwtService.sign(payload, { expiresIn: '1h' });
        const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });
        // In production, store refresh_token in DB or cache for invalidation
        return {
            access_token,
            refresh_token,
        };
    }

    /**
     * Validates a refresh token and returns a new access token if valid.
     */
    async refresh(refreshToken: string): Promise<{ access_token: string }> {
        try {
            const payload = this.jwtService.verify(refreshToken);
            // Optionally check if refreshToken is still valid in DB/cache
            const newAccessToken = this.jwtService.sign({ sub: payload.sub, email: payload.email, role: payload.role }, { expiresIn: '1h' });
            return { access_token: newAccessToken };
        } catch (err) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    /**
     * Logs out a user by invalidating their refresh token (requires DB/cache implementation).
     */
    async logout(refreshToken: string): Promise<{ message: string }> {
        // In production, remove or blacklist the refresh token in DB/cache
        // For demo, just return a message
        return { message: 'Logged out (refresh token invalidated)' };
    }
}
