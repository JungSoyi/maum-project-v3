import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService
  ) { }

  @Mutation(() => Question)
  createQuestion(@Args('createQuestionInput') createQuestionInput: CreateQuestionInput
  ) {
    return this.questionService.create(createQuestionInput);
  }

  @Query(() => [Question], { name: 'findQuestions' })
  findAll() {
    return this.questionService.findAll();
  }

  @Query(() => Question, { name: 'findQuestionById' })
  async findOneById(@Args('id', { type: () => Int }) id: number) {
    const question = await this.questionService.findById(id);
    if (!question) {
      throw new NotFoundException(id)
    }
    return question;
  }

  @Mutation(() => Question)
  updateQuestion(@Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput) {
    return this.questionService.update(updateQuestionInput.id, updateQuestionInput);
  }

  @Mutation(() => Question)
  removeQuestion(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.remove(id);
  }
}
