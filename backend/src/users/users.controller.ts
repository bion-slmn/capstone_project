import { Controller, Post, Body, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(private readonly usersService: UsersService) { }

    @Post('register-client')
    async registerClient(@Body() registerUserDto: RegisterUserDto) {
        this.logger.log(`Registering client: ${registerUserDto.email}`);
        return this.usersService.registerClient(registerUserDto);
    }


    @Post('register-rider')
    async registerRider(@Body() body: any) {
        const { licenseNumber, ...registerUserDto } = body;
        this.logger.log(`Registering rider: ${registerUserDto.email}`);
        return this.usersService.registerRider(registerUserDto, licenseNumber);
    }

}
