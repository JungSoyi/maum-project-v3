import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { NotFoundException } from '@nestjs/common';
import { CreateQuestionPayload } from './create-question.payload';
import { QuestionWhereUniqueInput } from './dto/question-where-unique.input';
import { MyLogger } from 'src/common/log/logger';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService,
    private readonly logger: MyLogger
  ) { }


  @Mutation(returns => Question)
  async createQuestion(
    @Args('data') data: CreateQuestionInput,
  ) {
    this.logger.log('create Question');
    return this.questionService.create(data);

  }
  @Query(() => [Question], { name: 'findQuestions' })
  findAll() {
    this.logger.log('find Questions')
    return this.questionService.findAll();
  }

  @Query(() => Question, { name: 'findQuestionById' })
  async findOneById(@Args('id', { type: () => Int }) id: number) {
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
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Question | undefined> {
    this.logger.log('update a Question');
    return await this.questionService.update(data, id);
  }

  // @Mutation(() => Question)
  // async removeQuestion(@Args('id') id: string) {
  //   this.logger.log('delete a Question');
  //   return this.questionService.remove(id);
  // }




}
