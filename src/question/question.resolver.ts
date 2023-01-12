import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { NotFoundException } from '@nestjs/common';
import { Answer } from 'src/answer/entities/answer.entity';
import { CreateQuestionPayload } from './create-question.payload';
import { QuestionWhereUniqueInput } from './dto/question-where-unique.input';
import { MyLogger } from 'src/common/logger';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService,
    private readonly logger: MyLogger
  ) { }


  @Mutation((_returns) => CreateQuestionPayload)
  async createQuestion(
    @Args('data') data: CreateQuestionInput,
  ): Promise<CreateQuestionPayload> {
    this.logger.log('create Question');
    const question = await this.questionService.create(data);
    return {
      questionEdge: { node: question, cursor: 'temp:${question.relayId' },
    };
  }
  @Query(() => [Question], { name: 'findQuestions' })
  findAll() {
    this.logger.log('find Questions')
    return this.questionService.findAll();
  }

  @Query(() => Question, { name: 'findQuestionById' })
  async findOneById(@Args('id', { type: () => String }) id: string) {
    this.logger.log('find a Question');
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
    this.logger.log('update a Question');
    return await this.questionService.update(data, where);
  }

  @Mutation(() => Question)
  async removeQuestion(@Args('id') id: string) {
    this.logger.log('delete a Question');
    return this.questionService.remove(id);
  }




}
