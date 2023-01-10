import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';

@Resolver(() => Answer)
export class AnswerResolver {
    constructor(private readonly answerService: AnswerService) { }

    // @Mutation(() => Answer)
    // createAnswer(@Args({ name: 'questionId', type: () => Int }) questionId: number, @Args('createAnswerInput') createAnswerInput: CreateAnswerInput) {
    //     return this.answerService.create(question_id: questionId, createAnswerInput);
    // }

    // @Mutation(() => [Answer])
    // createAnswers(@Args('createAnswerInput') createAnswerInput: CreateAnswerInput) {
    //     return this.answerService.create(createAnswerInput);
    // }

    @Query(() => [Answer], { name: 'finsAnswers' })
    findAll(question_id: number) {
        return this.answerService.findAll(question_id);
    }

    @Query(() => Answer, { name: 'findAnswerById' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.answerService.findOne(id);
    }

    @Mutation(() => Answer)
    updateAnswer(@Args('updateAnswerInput') updateAnswerInput: UpdateAnswerInput) {
        return this.answerService.update(updateAnswerInput.id, updateAnswerInput);
    }

    @Mutation(() => Answer)
    removeAnswer(@Args('id', { type: () => Int }) id: number) {
        return this.answerService.remove(id);
    }
}
