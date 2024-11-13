import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    type: 'timestamp',
    default: Date.now,
  })
  createdAt: Date;
}
