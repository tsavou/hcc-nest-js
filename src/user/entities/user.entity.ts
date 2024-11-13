import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: 'coach' | 'contributeur' | 'joueur' | 'admin';

  @Column({ default: false })
  isValidated: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
