const {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} = require('typeorm');
const { Task } = require('../tasks/task.entity');

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id;

  @Column({ type: 'varchar', length: 255, unique: true })
  email;

  @Column({ type: 'varchar', length: 255 })
  password;

  @OneToMany(() => Task, (task) => task.user)
  tasks;
}

module.exports = { User };
