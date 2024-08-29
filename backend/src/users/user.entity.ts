import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Task, (task) => task.assignee)
  assignedTasks: Task[];

  @OneToMany(() => Task, (task) => task.admin)
  createdTasks: Task[];

  @Column({unique: true})
  login: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({type: 'enum', enum: ['admin', 'assignee'], default: 'assignee'})
  roles: string;
}