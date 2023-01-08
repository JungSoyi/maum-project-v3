import { Injectable, Inject } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {

  constructor(
    @Inject('QUESTION_REPOSITORY')
    private questionRepository: Repository<Question>,
  ) { }

  create(createQuestionInput: CreateQuestionInput) {
    const question = new Question();
    question.question_item = createQuestionInput.question_item;
    question.question_number = createQuestionInput.question_number;
    return this.questionRepository.save(question);
  }

  findAll(): Promise<Question[]> {
    return this.questionRepository.find();
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
