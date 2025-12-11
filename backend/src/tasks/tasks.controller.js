const {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
} = require('@nestjs/common');

const { JwtAuthGuard } = require('../auth/jwt-auth.guard');
const { TasksService } = require('./tasks.service');

@Controller('tasks')
@UseGuards(JwtAuthGuard)
class TasksController {
  constructor(tasksService) {
    this.tasksService = tasksService;
  }

  @Get()
  getMyTasks(req) {
    return this.tasksService.getTasksForUser(req.user.id);
  }

  @Post()
  createTask(req) {
    return this.tasksService.createTaskForUser(req.user, req.body);
  }

  @Put(':id')
  updateTask(req) {
    const id = Number(req.params.id);

    return this.tasksService.updateTaskForUser(id, req.user.id, req.body);
  }

  @Delete(':id')
  deleteTask(req) {
    const id = Number(req.params.id);

    return this.tasksService.deleteTaskForUser(id, req.user.id);
  }
}

TasksController.inject = [TasksService];
module.exports = { TasksController };
