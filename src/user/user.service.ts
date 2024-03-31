import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import{ v4 as uuidv4} from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
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
        const newUser = {
            ...userDto,
            id: uuidv4(),
            version: 1,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        this.db.users.push(newUser);
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    async deleteUser(id: string) {
        deleteEntityFromCollection(id, this.db.users);
    }
}
