const { Injectable } = require('@nestjs/common');
const { InjectRepository } = require('@nestjs/typeorm');
const { User } = require('./user.entity');
const { Repository } = require('typeorm');

@Injectable()
class UsersService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async findByEmail(email) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async createUser(email, hashedPassword) {
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async findById(id) {
    return this.userRepository.findOne({
      where: { id },
    });
  }
}

UsersService.inject = [InjectRepository(User)];

module.exports = { UsersService };
