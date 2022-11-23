import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthInfoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @Column()
    token: string;
}
