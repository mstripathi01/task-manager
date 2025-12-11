const { Injectable, NotFoundException } = require('@nestjs/common');
const { InjectRepository } = require('@nestjs/typeorm');
const { Task } = require('./task.entity');

@Injectable()
class TasksService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  getTasksForUser(userId) {
    return this.taskRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { id: 'DESC' },
    });
  }

  createTaskForUser(user, dto) {
    const task = this.taskRepository.create({
      title: dto.title,
      description: dto.description,
      status: dto.status || 'To Do',
      due_date: dto.due_date || null,
      user,
    });

    return this.taskRepository.save(task);
  }

  async updateTaskForUser(taskId, userId, dto) {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, user: { id: userId } },
      relations: ['user'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    Object.assign(task, dto);

    return this.taskRepository.save(task);
  }

  async deleteTaskForUser(taskId, userId) {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, user: { id: userId } },
      relations: ['user'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.taskRepository.remove(task);

    return { deleted: true };
  }
}

TasksService.inject = [InjectRepository(Task)];

module.exports = { TasksService };
