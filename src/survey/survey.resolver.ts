import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import { Survey } from './entities/survey.entity';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { NotFoundException } from '@nestjs/common';
import { CreateSurveyPayload } from './entities/create-survey.payload';
import { SurveyWhereUniqueInput } from './dto/survey-where-unique.input';
import { MyLogger } from 'src/common/logger';

@Resolver(of => Survey)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService,
    private readonly logger: MyLogger) { }

  @Mutation((_returns) => CreateSurveyPayload)
  async createSurvey(
    @Args('data') data: CreateSurveyInput,
  ): Promise<CreateSurveyPayload> {
    this.logger.log('create a Survey');
    const survey = await this.surveyService.create(data);
    return {
      surveyEdge: { node: survey, cursor: 'temp:${survey.relayId' },
    };
  }

  @Query(() => [Survey], { name: 'findSurveys' })
  findAll() {
    this.logger.log('find Surveys');
    return this.surveyService.findAll();
  }


  @Query(() => Survey, { name: 'findSurveyById' })
  async findOneById(@Args('id', { type: () => String }) id: string) {
    this.logger.log('find a Survey');
    const survey = await this.surveyService.findOneById(id);
    if (!survey) {
      throw new NotFoundException(id)
    }
    if (survey.total_score == 0) {
      this.surveyService.sumScore(id);
    }

    return survey;
  }

  @Mutation((_returns) => Survey, { nullable: true })
  async updateSurvey(
    @Args('data') data: UpdateSurveyInput,
    @Args('where') where: SurveyWhereUniqueInput,
  ): Promise<Survey | undefined> {
    this.logger.log('update a Survey');
    return await this.surveyService.update(data, where);
  }

  @Mutation(() => Survey)
  removeSurvey(@Args('id') id: string) {
    this.logger.log('delete a Survey');
    return this.surveyService.remove(id);
  }
}
