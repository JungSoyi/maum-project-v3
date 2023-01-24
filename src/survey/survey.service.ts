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

  async create(createSurveyInput: CreateSurveyInput) {
    const survey = new Survey();
    survey.survey_number = createSurveyInput.survey_number;

    return this.surveyRepository.save(survey);
  }

  findAll(): Promise<Survey[]> {
    return this.surveyRepository.find();
  }

  // findOneById(id: string) {
  //   const survey = this.surveyRepository.findOneBy({ id });

  //   return survey;
  // }

  // async update(
  //   data: UpdateSurveyInput,
  //   where: SurveyWhereUniqueInput,
  // ): Promise<Survey | undefined> {
  //   const parsedSurveyId = Relay.fromGlobalId(where.id);
  //   if (!isUUID(parsedSurveyId.id)) {
  //     return undefined;
  //   }
  //   const survey = await this.surveyRepository.findOne({ where: parsedSurveyId });
  //   if (!survey) {
  //     return survey;
  //   }
  //   this.surveyRepository.merge(survey, data);
  //   return await this.surveyRepository.save(survey);
  // }

  // async remove(id: string) {
  //   if (!isUUID(id)) {
  //     return undefined;
  //   }
  //   const survey = await this.surveyRepository.findOne({ where: { id: id } });
  //   if (!survey) {
  //     return survey;
  //   }
  //   return this.surveyRepository.remove(survey);
  // }

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
