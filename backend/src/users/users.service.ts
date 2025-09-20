

import { Injectable, Logger, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { Client } from './models';
import { Rider } from './models';
import { Model, ModelCtor } from 'sequelize-typescript';

@Injectable()
export class UsersService {

    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) { }

    /**


    /**
     * Finds a user by their unique ID.
     * Returns user with selected fields or throws NotFoundException if not found.
     */
    async findById(id: number): Promise<User> {
        try {
            const user = await this.userModel.findByPk(id, {
                attributes: ['id', 'email', 'role']
            });
            if (!user) {
                this.logger.warn(`User with id ${id} not found.`);
                throw new NotFoundException('User not found');
            }
            return user;
        } catch (error) {
            this.logger.error(`Error finding user by id: ${id}`, error.stack);
            throw new InternalServerErrorException('Failed to find user');
        }
    }



    /**
     * Registers a new client user.
     * Hashes password before saving. Throws on error.
     */
    /**
     * Shared logic for registering a user and linking a profile.
     */
    private async registerWithProfile<T extends Model>(
        registerUserDto: RegisterUserDto,
        role: string, profileModel: ModelCtor<T>,
        profileFields: Record<string, any> = {}): Promise<T> {
        try {
            const { email, password, phoneNumber } = registerUserDto;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                email,
                password: hashedPassword,
                role,
                phoneNumber
            });
            const profile = await profileModel.create({
                userId: user.id,
                ...profileFields
            } as any);
            this.logger.log(`${role.charAt(0).toUpperCase() + role.slice(1)} registered: ${email}`);
            return profile as T;
        } catch (error) {
            this.logger.error(`Error registering ${role}: ${registerUserDto.email}`, error.stack);
            throw new InternalServerErrorException(`Failed to register ${role}`);
        }
    }

    async registerClient(registerUserDto: RegisterUserDto): Promise<Client> {
        return this.registerWithProfile<Client>(registerUserDto, 'client', Client, { loyaltyPoints: 0 });
    }

    async registerRider(registerUserDto: RegisterUserDto, licenseNumber: string): Promise<Rider> {
        return this.registerWithProfile<Rider>(registerUserDto, 'rider', Rider, { licenseNumber, rating: 0 });
    }

    /**
     * Authenticates a user by email and password.
     * Returns user data (without password) if valid, throws otherwise.
     */
    async login(email: string, password: string): Promise<Omit<User, 'password'> | null> {
        try {
            const user = await this.userModel.findOne({ where: { email }, attributes: ['id', 'email', 'password', 'role'] });
            if (!user) {
                this.logger.warn(`Login failed: User not found for email ${email}`);
                throw new NotFoundException('User not found');
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                this.logger.warn(`Login failed: Invalid password for email ${email}`);
                throw new UnauthorizedException('Invalid credentials');
            }
            this.logger.log(`User logged in: ${email}`);
            // Return only safe fields
            const { password: userPassword, ...safeUser } = user.toJSON();
            return safeUser;
        } catch (error) {
            this.logger.error(`Error logging in user: ${email}`, error.stack);
            throw error instanceof NotFoundException || error instanceof UnauthorizedException
                ? error
                : new InternalServerErrorException('Failed to login user');
        }
    }
}
