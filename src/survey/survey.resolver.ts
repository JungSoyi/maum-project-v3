import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import { Survey } from './entities/survey.entity';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { CreateSurveyPayload } from './entities/create-survey.payload';
import { SurveyWhereUniqueInput } from './dto/survey-where-unique.input';
import { MyLogger } from 'src/common/log/logger';
import { InputValidationError } from 'src/common/input-validator-error';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';

@Resolver(of => Survey)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService,
    private readonly logger: MyLogger) { }

  @Mutation(returns => Survey)
  createSurvey(
    @Args('data') data: CreateSurveyInput) {
    this.logger.log('create a Survey');
    return this.surveyService.create(data);

  }

  @Query(() => [Survey], { name: 'findSurveys' })
  findAll() {
    this.logger.log('find Surveys');
    return this.surveyService.findAll();
  }


  // @Query(() => Survey, { name: 'findSurveyById' })
  // async findOneById(@Args('id', { type: () => String }) id: string) {
  //   this.logger.log('find a Survey');
  //   try {
  //     await this.surveyService.findOneById(id);
  //   } catch (error) {
  //     throw new InputValidationError(
  //       "Invalid survey Id", "find survey"
  //     )
  //   }
  //   const survey = await this.surveyService.findOneById(id);


  //   return survey;
  // }

  // @Mutation((_returns) => Survey, { nullable: true })
  // async updateSurvey(
  //   @Args('data') data: UpdateSurveyInput,
  //   @Args('where') where: SurveyWhereUniqueInput,
  // ): Promise<Survey | undefined> {
  //   this.logger.log('update a Survey');
  //   try {
  //     this.surveyService.findOneById(where.id);
  //   } catch (error) {
  //     throw new InputValidationError(
  //       "Invalid survey Id", "update survey"
  //     )
  //   }
  //   return await this.surveyService.update(data, where);
  // }

  // @Mutation(() => Survey)
  // removeSurvey(@Args('id') id: string) {
  //   this.logger.log('delete a Survey');
  //   try {
  //     this.surveyService.findOneById(id);
  //   } catch {
  //     throw HttpExceptionFilter;
  //   }
  //   return this.surveyService.remove(id);
  // }
}
