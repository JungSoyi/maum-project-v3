import { Injectable, Inject } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { QuestionWhereUniqueInput } from './dto/question-where-unique.input';
import { isUUID } from 'class-validator';
import * as Relay from 'graphql-relay';
import { SurveyService } from 'src/survey/survey.service';



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
    if (!survey_id) {
      throw new Error("Survey not exist");
    }

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

  async pickAnswer(id: string) {
    console.log('start pickAnswer');
    if (!isUUID(id)) {
      return undefined;
    }
    const question = await this.questionRepository.findOne({ where: { id: id } });
    for (var i = 0; i < question.answers.length; i++) {
      if (question.answers[i].answer_status == true) {
        console.log('i: %d', i);
        question.pick_answer = i;
        console.log('question.pick_answer: ', question.pick_answer)
        console.log('answer score: ', question.answers[i].answer_score);
        question.pick_answer_score = question.answers[i].answer_score;
        this.questionRepository.save(question);
      }
    }

    return await this.questionRepository.save(question);
  }


}
