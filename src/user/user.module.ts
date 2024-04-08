import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DB, db } from 'src/db'

@Module({
    providers: [
        UserService,
        {
            provide: 'DB_CONNECTION',
            useValue: new DB(),
        },
    ],
    controllers: [UserController],
    imports: [
        UserService,
        DB
    ]
})
export class UserModule {}
