import { Injectable, Inject } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {

  constructor(
    @Inject('QUESTION_REPOSITORY')
    private photoRepository: Repository<Question>,
  ) { }

  create(createQuestionInput: CreateQuestionInput) {
    return 'This action adds a new question';
  }

  findAll() {
    return `This action returns all question`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionInput: UpdateQuestionInput) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
