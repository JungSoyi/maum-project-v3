import { Injectable, Inject } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { AnswerService } from 'src/answer/answer.service';
import { Answer } from 'src/answer/entities/answer.entity';
import { QuestionWhereUniqueInput } from './dto/question-where-unique.input';
import { isUUID } from 'class-validator';


@Injectable()
export class QuestionService {

  constructor(
    @Inject('QUESTION_REPOSITORY')
    private questionRepository: Repository<Question>,
    // private answerService: AnswerService
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

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  findOneById(id: string) {
    return this.questionRepository.findOneBy({ id });
  }

  async update(
    data: UpdateQuestionInput,
    where: QuestionWhereUniqueInput,
  ): Promise<Question | undefined> {
    const Id = where.id;
    if (!isUUID(where.id)) {
      return undefined;
    }
    const question = await this.questionRepository.findOne({ where: { id: Id } });
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

  // findAnswers = async (question_id) => {
  //   answers = await getAnswersByQuestionId(question_id)
  //   answers.forEach((answer) => {
  //     dataloaderDictionary.get('answer').clear(answer.id).prime(answer.id, item)
  //   })
  //   return question_id.map((question_id) => this.answer.filter((a) => a.question_id === question_id))
  // }

  // async findByAnswerId(answer_id: number): Promise<Question[]> {
  //   let questions = this.questionRepository.find();
  //   return (await questions).filter((question) => question.answer_id === (answer_id));
  // }


}
