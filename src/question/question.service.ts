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


  async create(data: CreateQuestionInput) {

    const { survey_id, ...restData } = data;
    const question = this.questionRepository.create({
      ...restData,
      survey: { id: survey_id },
    });

    return this.questionRepository.save(question);

  }

  findAll(): Promise<Question[]> {
    console.log("start find all questions");
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

  /**
   * 답변 중 answer_status=true 이면 그 answer_score를 반환
   */
  async pickAnswer(id: string) {
    console.log('start pickAnswer');
    if (!isUUID(id)) {
      return undefined;
    }
    const question = await this.questionRepository.findOne({ where: { id: id } });
    for (var i = 0; question.answers.length < i; i++) {
      if (question.answers[i].answer_status == true) {
        console.log('question.pick_answer: ', question.pick_answer)
        console.log('i: %d', i);
        question.pick_answer = i;
        console.log('question.pick_answer: ', question.pick_answer)
        question.pick_answer_score = question.answers[i].answer_score;
      }
    }
    this.questionRepository.merge(question,)
    return true;
  }
}
