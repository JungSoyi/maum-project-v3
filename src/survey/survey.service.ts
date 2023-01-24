import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { Survey } from './entities/survey.entity';
import { QuestionService } from 'src/question/question.service';


@Injectable()
export class SurveyService {

  constructor(
    @Inject('SURVEY_REPOSITORY')
    private surveyRepository: Repository<Survey>,
    private questionService: QuestionService,
  ) { }

  async create(data: CreateSurveyInput) {
    const survey = this.surveyRepository.create(data);

    return this.surveyRepository.save(survey);
  }

  findAll(): Promise<Survey[]> {
    return this.surveyRepository.find();
  }

  findOneById(id: number) {
    const survey = this.surveyRepository.findOneBy({ id });

    return survey;
  }

  async update(data: UpdateSurveyInput, id: number) {
    const survey = await this.findOneById(id);
    if (!survey) {
      return survey;
    }
    this.surveyRepository.merge(survey, data);
    return await this.surveyRepository.save(survey);
  }

  async remove(id: number) {
    if (!this.findOneById(id)) {
      return undefined;
    }
    const survey = await this.findOneById(id);
    if (!survey) {
      return survey;
    }
    return this.surveyRepository.remove(survey);
  }

  /**
   * 설문이 완료되면 answer_status가 true인 항목의 점수를 합산
   */
  // async sumScore(id: string) {
  //   console.log('startsumScore');
  //   if (!isUUID(id)) {
  //     console.log('!isUUID');
  //     return undefined;
  //   }
  //   console.log('start totalscore calcurate');
  //   const survey = await this.surveyRepository.findOne({ where: { id: id } });
  //   // var total_score = survey.total_score;
  //   console.log(survey.questions.length);
  //   for (var i = 0; i < survey.questions.length; i++) {
  //     console.log(survey.questions[i].id);
  //     var question_id = survey.questions[i].id;
  //     console.log('survey i: %d', i);
  //     this.questionService.pickAnswer(question_id);
  //     console.log('question score %d', survey.questions[i].pick_answer_score);

  //     // total_score += survey.questions[i].pick_answer_score;
  //     // console.log("total_score", total_score);
  //   }
  //   // survey.total_score = total_score;

  //   return this.surveyRepository.save(survey);
  // }
}
