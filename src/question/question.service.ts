import { Injectable, Inject } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { AnswerService } from 'src/answer/answer.service';
import { Answer } from 'src/answer/entities/answer.entity';


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

  findById(question_id: number) {
    return this.questionRepository.findOneBy({ question_id });
  }

  update(id: number, updateQuestionInput: UpdateQuestionInput) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }

  // findAnswers = async (question_id) => {
  //   answers = await getAnswersByQuestionId(question_id)
  //   answers.forEach((answer) => {
  //     dataloaderDictionary.get('answer').clear(answer.id).prime(answer.id, item)
  //   })
  //   return question_id.map((question_id) => this.answer.filter((a) => a.question_id === question_id))
  // }

  async findByAnswerId(answer_id: number): Promise<Question[]> {
    let questions = this.questionRepository.find();
    return (await questions).filter((question) => question.answer_id === (answer_id));
  }


}
