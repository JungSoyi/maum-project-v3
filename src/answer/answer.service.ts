import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {

  constructor(
    @Inject('ANSWER_REPOSITORY')
    private answerRepository: Repository<Answer>,
  ) { }

  create(createAnswerInput: CreateAnswerInput) {
    const answer = new Answer();
    answer.answer_number = createAnswerInput.answer_number;
    answer.answer_item = createAnswerInput.answer_item;
    answer.answer_score = createAnswerInput.answer_score;
    return this.answerRepository.save(answer);
  }

  findAll() {
    return `This action returns all answer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerInput: UpdateAnswerInput) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
