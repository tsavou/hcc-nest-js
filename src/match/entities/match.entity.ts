import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity()
@Unique(['date'])
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  adversary: string;

  @Column()
  score: string;

  @Column()
  date: Date;

  @ManyToOne(() => UserEntity, (coach) => coach.matchesCreated)
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;

  @ManyToMany(() => UserEntity, (player) => player.matches)
  @JoinTable()
  players: UserEntity[];
}
