import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { Survey } from './entities/survey.entity';
import { isUUID } from 'class-validator';
import * as Relay from 'graphql-relay';
import { SurveyWhereUniqueInput } from './dto/survey-where-unique.input';


@Injectable()
export class SurveyService {

  constructor(
    @Inject('SURVEY_REPOSITORY')
    private surveyRepository: Repository<Survey>,
  ) { }

  async create(createSurveyInput: CreateSurveyInput) {
    const survey = new Survey();
    survey.survey_number = createSurveyInput.survey_number;
    survey.total_score = 0;

    return this.surveyRepository.save(survey);
  }

  findAll(): Promise<Survey[]> {
    return this.surveyRepository.find();
  }

  findOneById(id: string) {
    return this.surveyRepository.findOneBy({ id });
  }

  async update(
    data: UpdateSurveyInput,
    where: SurveyWhereUniqueInput,
  ): Promise<Survey | undefined> {
    const parsedSurveyId = Relay.fromGlobalId(where.id);
    if (!isUUID(parsedSurveyId.id)) {
      return undefined;
    }
    const survey = await this.surveyRepository.findOne({ where: parsedSurveyId });
    if (!survey) {
      return survey;
    }
    this.surveyRepository.merge(survey, data);
    return await this.surveyRepository.save(survey);
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      return undefined;
    }
    const survey = await this.surveyRepository.findOne({ where: { id: id } });
    if (!survey) {
      return survey;
    }
    return this.surveyRepository.remove(survey);
  }
}
