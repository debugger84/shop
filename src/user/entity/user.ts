import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {ApiModelProperty} from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Entity({ schema: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    @ApiModelProperty()
    readonly id: number;

    @Column({ length: 255 })
    @ApiModelProperty()
    readonly name: string;

    @Column({ length: 180, unique: true })
    @ApiModelProperty()
    readonly email: string;

    @Column({ length: 64, nullable: false, default: '' })
    @Exclude()
    private passwordHash: string;

    @Column({ length: 64, nullable: false, default: ''  })
    @Exclude()
    private salt: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    public async changePassword(password: string) {
        this.salt = Math.random()
            .toString(36)
            .replace(/[^a-zA-Z]+/g, '')
            .substr(0, 10);
        this.passwordHash = await this.hashPassword(this.salt + password);
    }

    public async isPasswordCorrect(password: string): Promise<boolean> {
        return this.passwordHash === await this.hashPassword(this.salt + password);
    }

    public async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}
