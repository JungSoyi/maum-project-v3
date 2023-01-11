import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Question } from 'src/question/entities/question.entity';
import { Repository } from 'typeorm';
import { QuestionService } from 'src/question/question.service';

@Resolver(() => Answer)
export class AnswerResolver {
    constructor(private readonly answerService: AnswerService,
        // private readonly answerRepository: Repository<Answer>,
        // private readonly questionService: QuestionService
    ) { }

    @Mutation(() => Answer)
    createAnswer(@Args({ name: 'question_Id', type: () => Int }) question_Id: number, @Args('createAnswerInput') createAnswerInput: CreateAnswerInput) {
        return this.answerService.create(createAnswerInput, question_Id);
    }

    @Mutation(() => [Answer])
    createAnswers(@Args('createAnswerInput') createAnswerInput: CreateAnswerInput, @Args({ name: 'question_Id', type: () => Int }) question_Id: number) {
        return this.answerService.create(createAnswerInput, question_Id);
    }

    @Query(() => [Answer], { name: 'findAnswers' })
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

    @ResolveField((of) => Question)
    async question(@Parent() answer: Answer): Promise<any> {
        return { __typename: 'Question', question_id: (await answer.question).question_id };
    }

}
