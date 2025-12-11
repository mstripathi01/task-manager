const { TypeOrmModule } = require('@nestjs/typeorm');
const { User } = require('../users/user.entity');
const { Task } = require('../tasks/task.entity');

function typeOrmConfig() {
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'task_manager',
    entities: [User, Task],
    synchronize: true,
  });
}

module.exports = { typeOrmConfig };

