import {
  Column,
  CreateDateColumn,
  Entity, ManyToMany, OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { News } from "../../news/entities/news.entity";
import { Match } from "../../match/entities/match.entity";

export enum UserRole {
  COACH = 'coach',
  CONTRIBUTOR = 'contributeur',
  PLAYER = 'joueur',
  ADMIN = 'admin',
}

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

  @Column({ default: UserRole.PLAYER })
  role: UserRole;

  @Column({ default: false })
  isValidated: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => News, (news) => news.user)
  news: News[];

  @OneToMany(() => Match, (match) => match.createdBy)
  matchesCreated: Match[];

  @ManyToMany(() => Match, (match) => match.players)
  matches: Match[];
}
