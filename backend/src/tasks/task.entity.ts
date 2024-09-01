import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

// set table name
@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.createdTasks)
  @JoinColumn({ name: 'admin_id' })
  admin: User;

  @ManyToOne(() => User, (user) => user.assignedTasks)
  @JoinColumn({ name: 'assignee_id' })
  assignee: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ enum: ['Task', 'Epic', 'Milestone']})
  type: string;

  @Column({ enum: ['Создана', 'В работе', 'Завершена'], default: 'Создана' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column()
  deadline: Date;

  @Column({ enum: [0, 25, 50, 75, 100], default: 0 })
  progress: number;

  @Column({ nullable: true })
  updated: Date;
}