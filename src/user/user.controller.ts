import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    
    @Get()
    async getAll() {
        return await this.userService.getUsers();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.userService.getUserById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED) 
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) 
    async delete(@Param('id') id: string) {
        return await this.userService.deleteUser(id)
    }

    @Put(':id')
    async update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
        return await this.userService.updatePassword(updateUserDto, id)
    }
}
