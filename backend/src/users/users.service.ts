

import { Injectable, Logger, InternalServerErrorException, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, Rider, Client } from './models';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { Model, ModelCtor } from 'sequelize-typescript';

@Injectable()
export class UsersService {

    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        @InjectModel(Rider)
        private riderModel: typeof Rider,
        @InjectModel(Client)
        private clientModel: typeof Client,

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
            this.handleError(`finding user by id ${id}`, error);
        }
    }



    /**
     * Registers a new client user.
     * Hashes password before saving. Throws on error.
     */
    /**
     * Shared logic for registering a user and linking a profile.
     */
    /**
     * Registers a user and links a profile (Client or Rider).
     */
    private async registerWithProfile<T extends Model>(
        registerUserDto: RegisterUserDto,
        role: string,
        profileModel: ModelCtor<T>,
        profileFields: Record<string, any> = {}
    ): Promise<T> {
        try {
            const { email, password, phoneNumber } = registerUserDto;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                email,
                password: hashedPassword,
                role,
                phoneNumber
            });
            this.logger.log(`User created: ${user.id}, ${user.email}, ${user.role}`);

            const profile = await profileModel.create({
                userId: user.id,
                ...profileFields
            } as any);
            this.logger.log(`${role.charAt(0).toUpperCase() + role.slice(1)} profile created: ${profile.id}`);
            return profile as T;
        } catch (error) {
            this.handleError(`registering ${role} (${registerUserDto.email})`, error);
        }
    }

    /**
     * Registers a new client user.
     */
    async registerClient(registerUserDto: RegisterUserDto): Promise<Client> {
        const role = 'client';
        if (registerUserDto.role && registerUserDto.role !== role) {
            throw new BadRequestException(`Invalid role for client registration: ${registerUserDto.role}`);
        }
        return this.registerWithProfile<Client>(registerUserDto, role, this.clientModel, { loyaltyPoints: 0 });
    }

    /**
     * Registers a new rider user.
     */
    async registerRider(registerUserDto: RegisterUserDto, licenseNumber: string): Promise<Rider> {
        const role = 'rider';
        if (registerUserDto.role && registerUserDto.role !== role) {
            throw new BadRequestException(`Invalid role for rider registration: ${registerUserDto.role}`);
        }
        return this.registerWithProfile<Rider>(registerUserDto, role, this.riderModel, { licenseNumber, rating: 0 });
    }

    /**
     * Authenticates a user by email and password.
     * Returns user data (without password) if valid, throws otherwise.
     */
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
            this.handleError(`logging in user ${email}`, error);
        }
    }

    /**
     * Finds a rider profile by userId.
     */
    async getRiderProfileByUserId(userId: string): Promise<Rider> {
        try {
            const rider = await this.riderModel.findOne({ where: { userId } });
            if (!rider) {
                this.logger.warn(`Rider profile not found for userId: ${userId}`);
                throw new NotFoundException('Rider profile not found');
            }
            return rider;
        } catch (error) {
            this.handleError(`fetching rider profile for userId ${userId}`, error);
        }
    }

    /**
     * Finds a client profile by userId.
     */
    async getClientProfileByUserId(userId: string): Promise<Client> {
        try {
            const client = await this.clientModel.findOne({ where: { userId } });
            if (!client) {
                this.logger.warn(`Client profile not found for userId: ${userId}`);
                throw new NotFoundException('Client profile not found');
            }
            return client;
        } catch (error) {
            this.handleError(`fetching client profile for userId ${userId}`, error);
        }
    }

    /**
     * Centralized error handler for service methods
     */
    private handleError(action: string, error: any): never {
        this.logger.error(`Error ${action}: ${error.message}`, error.stack);
        throw new InternalServerErrorException(`Failed to ${action}`);
    }
}
