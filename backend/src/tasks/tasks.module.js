const { Module } = require('@nestjs/common');
const { TypeOrmModule } = require('@nestjs/typeorm');
const { Task } = require('./task.entity');
const { TasksService } = require('./tasks.service');
const { TasksController } = require('./tasks.controller');
const { UsersModule } = require('../users/users.module');

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule],
  controllers: [TasksController],
  providers: [TasksService],
})
class TasksModule {}

module.exports = { TasksModule };
