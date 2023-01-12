import { Inject, Injectable } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { AnswerWhereUniqueInput } from './dto/answer-where-unique.input';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Answer } from './entities/answer.entity';
import * as Relay from 'graphql-relay';


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
      question: { id: question_id },
    });
    return await this.answerRepository.save(answer);
  }


  async findAll() {
    return this.answerRepository.find();
  }

  async update(
    data: UpdateAnswerInput,
    where: AnswerWhereUniqueInput
  ): Promise<Answer | undefined> {
    const id = where.id;
    if (!where.id) {
      return undefined;
    }
    const answer = await this.answerRepository.findOne({ where: { id: id } });
    if (!Answer) {
      return answer;
    }
    this.answerRepository.merge(answer, data);
    return await this.answerRepository.save(answer);

  }

  async remove(id: string) {
    if (!isUUID(id)) {
      return undefined;
    }
    const answer = await this.answerRepository.findOne({ where: { id: id } });
    if (!answer) {
      return answer;
    }
    return this.answerRepository.remove(answer);
  }


  async findOneById(id: string): Promise<Answer | undefined> {
    return await this.answerRepository.findOneBy({ id });
  }
}
