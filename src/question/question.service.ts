import { Injectable, Inject } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { QuestionWhereUniqueInput } from './dto/question-where-unique.input';
import { isUUID } from 'class-validator';
import * as Relay from 'graphql-relay';



@Injectable()
export class QuestionService {

  constructor(
    @Inject('QUESTION_REPOSITORY')
    private questionRepository: Repository<Question>,
  ) { }


  async create(createQuestionInput: CreateQuestionInput) {
    const question = new Question();
    question.question_item = createQuestionInput.question_item;
    question.question_number = createQuestionInput.question_number;

    return this.questionRepository.save(question);

  }

  findAll(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  findOneById(id: string) {
    return this.questionRepository.findOneBy({ id });
  }

  async update(
    data: UpdateQuestionInput,
    where: QuestionWhereUniqueInput,
  ): Promise<Question | undefined> {
    const parsedQuestionId = Relay.fromGlobalId(where.id);
    if (!isUUID(parsedQuestionId.id)) {
      return undefined;
    }
    const question = await this.questionRepository.findOne({ where: parsedQuestionId });
    if (!question) {
      return question;
    }
    this.questionRepository.merge(question, data);
    return await this.questionRepository.save(question);
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      return undefined;
    }
    const question = await this.questionRepository.findOne({ where: { id: id } });
    if (!question) {
      return question;
    }
    return this.questionRepository.remove(question);
  }

}
