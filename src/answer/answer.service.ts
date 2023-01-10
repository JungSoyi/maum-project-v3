import { Inject, Injectable } from '@nestjs/common';
import { Question } from 'src/question/entities/question.entity';
import { QuestionService } from 'src/question/question.service';
import { Repository } from 'typeorm';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {

  constructor(
    @Inject('ANSWER_REPOSITORY')
    private answerRepository: Repository<Answer>,
    private questionService: QuestionService
  ) { }

  async create(createAnswerInput: CreateAnswerInput, question_id: number) {
    const answer = new Answer();
    answer.answer_number = createAnswerInput.answer_number;
    answer.answer_item = createAnswerInput.answer_item;
    answer.answer_score = createAnswerInput.answer_score;
    const question = this.questionService.findById(question_id);
    answer.question = question;
    return await this.answerRepository.save(answer);
  }

  async findAll(question_id: number): Promise<Answer> {
    return {} as any;
  }

  async findOne(answer_id: number) {
    return this.answerRepository.findOneBy({ answer_id });
  }

  // async findAnswerByQuestionId(question_id: number) {
  //   const question = this.questionService.findById( question_id );
  //   return this.answerRepository.findOneBy(question)
  // }

  async update(id: number, updateAnswerInput: UpdateAnswerInput) {
    return `This action updates a #${id} answer`;
  }

  async remove(id: number): Promise<boolean> {
    return true;
  }
}
