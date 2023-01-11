import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Question } from 'src/question/entities/question.entity';
import { CreateAnswerPayload } from './create-answer.payload';
import * as Relay from 'graphql-relay';
import { QuestionService } from 'src/question/question.service';


@Resolver(() => Answer)
export class AnswerResolver {
    constructor(private readonly answerService: AnswerService,
        private readonly questionService: QuestionService
    ) { }



    @Mutation((_returns) => CreateAnswerPayload)
    async createAnswer(
        @Args('data') data: CreateAnswerInput,
    ): Promise<CreateAnswerPayload> {
        const { question_id, ...rest } = data;
        // const databaseQuestionId = Relay.fromGlobalId(question_id).id;
        const createdAnswer = await this.answerService.create({
            ...rest,
            question_id: question_id,
        });
        return {
            answerEdge: { node: createdAnswer, cursor: `temp:${createdAnswer.relayId}` },
        };
    }


    // @Mutation(() => [Answer])
    // createAnswers(@Args('createAnswerInput') createAnswerInput: CreateAnswerInput, @Args({ name: 'question_Id', type: () => Int }) question_Id: number) {
    //     return this.answerService.create(createAnswerInput, question_Id);
    // }

    @Query(() => [Answer], { name: 'findAnswers' })
    findAll(question_id: number) {
        return this.answerService.findAll(question_id);
    }

    // @Query(() => Answer, { name: 'findAnswerById' })
    // findOne(@Args('id', { type: () => Int }) id: number) {
    //     return this.answerService.findOne(id);
    // }

    @Mutation(() => Answer)
    updateAnswer(@Args('updateAnswerInput') updateAnswerInput: UpdateAnswerInput) {
        return this.answerService.update(updateAnswerInput.id, updateAnswerInput);
    }

    @Mutation(() => Answer)
    removeAnswer(@Args('id', { type: () => Int }) id: number) {
        return this.answerService.remove(id);
    }

    @ResolveField(() => Question)
    async question(@Parent() answer: Answer): Promise<Question> {
        const question = await this.questionService.findOneById(answer.question_id);
        return question!;
    }

}
