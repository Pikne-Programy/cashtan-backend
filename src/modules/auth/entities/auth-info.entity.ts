import { UserEntity } from 'modules/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthInfoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @Column({
        unique: true,
        nullable: true,
    })
    token?: string | null;

    @OneToOne(() => UserEntity, {
        cascade: true,
        nullable: false,
    })
    user: UserEntity;
}
