import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { NotFoundException } from '@nestjs/common';
import { Answer } from 'src/answer/entities/answer.entity';
import { CreateQuestionPayload } from './create-question.payload';
import { QuestionWhereUniqueInput } from './dto/question-where-unique.input';
import * as Relay from 'graphql-relay';


@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService
  ) { }


  @Mutation((_returns) => CreateQuestionPayload)
  async createQuestion(
    @Args('data') data: CreateQuestionInput,
  ): Promise<CreateQuestionPayload> {
    const { survey_id, ...restData } = data;
    const databaseSurveyId = Relay.fromGlobalId(survey_id).id;
    const createdQuestion = await this.questionService.create({
      ...restData,
      survey_id: databaseSurveyId,
    });
    return {
      questionEdge: { node: createdQuestion, cursor: `temp:${createdQuestion.relayId}` },
    };
  }
  @Query(() => [Question], { name: 'findQuestions' })
  findAll() {
    return this.questionService.findAll();
  }

  @Query(() => Question, { name: 'findQuestionById' })
  async findOneById(@Args('id', { type: () => String }) id: string) {
    const question = await this.questionService.findOneById(id);
    if (!question) {
      throw new NotFoundException(id)
    }
    return question;
  }


  @Mutation((_returns) => Question, { nullable: true })
  async updateQuestion(
    @Args('data') data: UpdateQuestionInput,
    @Args('where') where: QuestionWhereUniqueInput,
  ): Promise<Question | undefined> {
    return await this.questionService.update(data, where);
  }

  @Mutation(() => Question)
  async removeQuestion(@Args('id') id: string) {
    return this.questionService.remove(id);
  }


}
