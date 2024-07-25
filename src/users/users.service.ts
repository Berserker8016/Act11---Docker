import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
    {
        userId: 1,
        username: 'john',
        email: 'example@gmail.com',
        password: 'changeme',
        estaus: true,
    },
    {
        userId: 2,
        username: 'joel',
        email: 'joel2@gmail.com',
        password: 'tehlasofus',
        estaus: true,
    },
    ];

    async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
    }
}