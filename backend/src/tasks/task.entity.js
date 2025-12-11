const {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} = require('typeorm');
const { User } = require('../users/user.entity');

@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn()
  id;

  @Column({ type: 'varchar', length: 255 })
  title;

  @Column({ type: 'text', nullable: true })
  description;

  @Column({ type: 'varchar', length: 50, default: 'To Do' })
  status;

  @Column({ type: 'date', nullable: true })
  due_date;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user;
}

module.exports = { Task };
