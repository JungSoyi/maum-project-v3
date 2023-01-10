import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Answer } from 'src/answer/entities/answer.entity';
import { CreateAnswerInput } from 'src/answer/dto/create-answer.input';
import { AnswerService } from 'src/answer/answer.service';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService
  ) { }

  @Mutation(() => Question)
  createQuestion(@Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
    @Args('createAnswerInput') CreateAnswerInput: CreateAnswerInput) {
    return this.questionService.create(createQuestionInput, [CreateAnswerInput]);
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

  // @ResolveField('answers', returns => [Answer])
  // async getAnswers(@Parent() question: Question) {
  //   const { question_id } = question;
  //   return this.answerService.findAll(question_id);
  // }
}
