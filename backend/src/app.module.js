const { Module } = require('@nestjs/common');
const { typeOrmConfig } = require('./config/typeorm.config');
const { AuthModule } = require('./auth/auth.module');
const { UsersModule } = require('./users/users.module');
const { TasksModule } = require('./tasks/tasks.module');

@Module({
  imports: [typeOrmConfig(), AuthModule, UsersModule, TasksModule],
})
class AppModule {}

module.exports = { AppModule };
