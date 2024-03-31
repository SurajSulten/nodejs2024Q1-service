import { UpdateUserDto } from './dto/update-user.dto';
import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import{ v4 as uuidv4} from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { validateIdFormat } from 'src/helpers/validateIdFormat';
// import { IUser } from 'src/types/interfaces';
// import {
//     deleteEntityFromCollection,
//     getEntityById,
//     validateIdFormat
// } from 'src/helpers'

@Injectable()
export class UserService {
    constructor(@Inject('DB_CONNECTION') private readonly db: DB) {}

    async getUsers() {
        return this.db.users.map((user) => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        })
    }

    async getUserById(id: string) {
        validateIdFormat(id);
        const user = getEntityById(id, this.db.users);
        if(user) {
            const { password, userWithoutPassword } = user;
            return userWithoutPassword;
        }
    }

    async createUser(userDto: CreateUserDto) {
        if(
            !userDto.login ||
            !userDto.password || 
            typeof userDto.login !== 'string' ||
            typeof userDto.password !== 'string'
        ) {
            throw new BadRequestException(
                'Request body does not contain required fields or their format is npt correct' 
            );
        }
        const currentTimestamp = Date.now();
        const newUser = {
            ...userDto,
            id: uuidv4(),
            version: 1,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
        };
        this.db.users.push(newUser);
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    async deleteUser(id: string) {
        deleteEntityFromCollection(id, this.db.users);
    }

    async updatePassword(UpdateUserDto: UpdateUserDto, id: string) {
        if(
            !UpdateUserDto.oldPassword ||
            !UpdateUserDto.newPassword || 
            typeof updateUserDto.oldPassword !== 'string' ||
            typeof updateUserDto.newPassword !== 'string' 
        ) {
            throw new BadRequestException(
                'Request body does not contain required fields or their format is npt correct'
            );
        }
        validateIdFormat(id);
        const user: IUser = this.db.users.find((user) => user.id === id);

        if(user) {
            if(updateUserDto.oldPassword !== user.password) {
                throw new ForbiddenException('Old password is wrong');
            }
            const updateUser = {
                ...user,
                password: updateUserDto.newPassword,
                version: user.version + 1,
                updatedAt: Date.now() 
            };
            const userIdx = this.db.users.indexOf(user);
            this.db.users[userIdx] = updateUser;
            const { password, ...userWithoutPassword } = updatedUser;
            return userWithoutPassword;
        } else {
            throw new NotFoundException(`User with id ${id} not found`);
        }
    }
}
