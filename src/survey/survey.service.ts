import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { Survey } from './entities/survey.entity';
import { isUUID } from 'class-validator';
import * as Relay from 'graphql-relay';


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

  findAll() {
    return `This action returns all survey`;
  }

  findOneById(id: string) {
    return this.surveyRepository.findOneBy({ id });
  }

  update(id: number, updateSurveyInput: UpdateSurveyInput) {
    return `This action updates a #${id} survey`;
  }

  remove(id: number) {
    return `This action removes a #${id} survey`;
  }
}
