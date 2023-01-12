import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import { Survey } from './entities/survey.entity';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { NotFoundException } from '@nestjs/common';
import { CreateSurveyPayload } from './entities/create-survey.payload';

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

  @Query(() => [Survey], { name: 'survey' })
  findAll() {
    return this.surveyService.findAll();
  }


  @Query(() => Survey, { name: 'findSurveyById' })
  async findOneById(@Args('id', { type: () => String }) id: string) {
    const survey = await this.surveyService.findOneById(id);
    if (!survey) {
      throw new NotFoundException(id)
    }
    return survey;
  }

  @Mutation(() => Survey)
  updateSurvey(@Args('updateSurveyInput') updateSurveyInput: UpdateSurveyInput) {
    return this.surveyService.update(updateSurveyInput.id, updateSurveyInput);
  }

  @Mutation(() => Survey)
  removeSurvey(@Args('id', { type: () => Int }) id: number) {
    return this.surveyService.remove(id);
  }
}
