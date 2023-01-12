import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import { Survey } from './entities/survey.entity';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { NotFoundException } from '@nestjs/common';
import { CreateSurveyPayload } from './entities/create-survey.payload';
import { SurveyWhereUniqueInput } from './dto/survey-where-unique.input';

@Resolver(of => Survey)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) { }

  @Mutation((_returns) => CreateSurveyPayload)
  async createSurvey(
    @Args('data') data: CreateSurveyInput,
  ): Promise<CreateSurveyPayload> {
    const survey = await this.surveyService.create(data);
    return {
      surveyEdge: { node: survey, cursor: 'temp:${survey.relayId' },
    };
  }

  @Query(() => [Survey], { name: 'findSurveys' })
  findAll() {
    console.log('start surveyService');
    this.surveyService.sumScore;
    console.log('success sum score');
    return this.surveyService.findAll();
  }


  @Query(() => Survey, { name: 'findSurveyById' })
  async findOneById(@Args('id', { type: () => String }) id: string) {
    const survey = await this.surveyService.findOneById(id);
    if (!survey) {
      throw new NotFoundException(id)
    }
    this.surveyService.sumScore(id);
    return survey;
  }

  @Mutation((_returns) => Survey, { nullable: true })
  async updateSurvey(
    @Args('data') data: UpdateSurveyInput,
    @Args('where') where: SurveyWhereUniqueInput,
  ): Promise<Survey | undefined> {
    return await this.surveyService.update(data, where);
  }

  @Mutation(() => Survey)
  removeSurvey(@Args('id') id: string) {
    return this.surveyService.remove(id);
  }
}
