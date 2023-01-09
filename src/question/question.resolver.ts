import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Answer } from 'src/answer/entities/answer.entity';
import { CreateAnswerInput } from 'src/answer/dto/create-answer.input';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) { }

  @Mutation(() => Question)
  createQuestion(@Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
    @Args('createAnswerInput') CreateAnswerInput: CreateAnswerInput) {
    return this.questionService.create(createQuestionInput, [CreateAnswerInput]);
  }

  @Query(() => [Question], { name: 'question' })
  findAll() {
    return this.questionService.findAll();
  }

  @Query(() => Question, { name: 'question' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.findOne(id);
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
