import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'; // ✅ Add this
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtAuthGuard, ClientRoleGuard, RiderRoleGuard, JwtStrategy } from './guards';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // ✅ Register passport with default strategy
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,  // ✅ Must be a provider so Nest can load it
    JwtAuthGuard,
    ClientRoleGuard,
    RiderRoleGuard,
  ],
  controllers: [AuthController],
  exports: [
    AuthService,
    JwtModule,
    PassportModule, // ✅ Export so other modules can use it
    JwtAuthGuard,
    ClientRoleGuard,
    RiderRoleGuard,
  ],
})
export class AuthModule { }
