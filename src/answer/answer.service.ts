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


  async create(data: CreateAnswerInput) {
    const { question_id, ...restData } = data;
    const answer = this.answerRepository.create({
      ...restData,
      question: { question_id: question_id },
    });
    return await this.answerRepository.save(answer);
  }


  async findAll() {
    return this.answerRepository.find();
  }

  async findOne(answer_id: string) {
    return this.answerRepository.findOneBy({ answer_id });
  }


  async findByIds(answer_id: string) {
    return this.answerRepository.findBy({ answer_id });
  }

  async update(id: number, updateAnswerInput: UpdateAnswerInput) {
    return `This action updates a #${id} answer`;
  }

  async remove(id: number): Promise<boolean> {
    return true;
  }


  async findOneById(answer_id: string): Promise<Answer | undefined> {
    return await this.answerRepository.findOneBy({ answer_id });
  }
}
