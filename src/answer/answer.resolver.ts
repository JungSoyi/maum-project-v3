import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Question } from 'src/question/entities/question.entity';
import { CreateAnswerPayload } from './create-answer.payload';
import * as Relay from 'graphql-relay';
import { QuestionService } from 'src/question/question.service';
import { AnswerWhereUniqueInput } from './dto/answer-where-unique.input';
import { MyLogger } from 'src/common/log/logger';


@Resolver(() => Answer)
export class AnswerResolver {
    constructor(private readonly answerService: AnswerService,
        private readonly questionService: QuestionService,
        private readonly logger: MyLogger
    ) { }



    @Mutation((_returns) => CreateAnswerPayload)
    async createAnswer(
        @Args('data') data: CreateAnswerInput,
    ): Promise<CreateAnswerPayload> {
        this.logger.log(data);
        const { question_id, ...rest } = data;
        const databaseQuestionId = Relay.fromGlobalId(question_id).id;
        try {
            const response = await fetch('유효하지 않은 질문');
        } catch (err) {
            alert(err);
        }
        const createdAnswer = await this.answerService.create({
            ...rest,
            question_id: databaseQuestionId,
        });
        return {
            answerEdge: { node: createdAnswer, cursor: `temp:${createdAnswer.relayId}` },
        };
    }


    @Query((_returns) => [Answer])
    async findAnswers() {
        this.logger.log('get Answers');
        return await this.answerService.findAll();
    }


    @Mutation((_returns) => Answer, { nullable: true })
    async updateAnswer(
        @Args('data') data: UpdateAnswerInput,
        @Args('where') where: AnswerWhereUniqueInput,
    ): Promise<Answer | undefined> {
        this.logger.log('update Answer');
        return await this.answerService.update(data, where);
    }

    @Mutation(() => Answer)
    async removeAnswer(@Args('id') id: string) {
        this.logger.log('delete Answer')
        return this.answerService.remove(id);
    }

    @ResolveField(() => Question)
    async question(@Parent() answer: Answer): Promise<Question> {
        const question = await this.questionService.findOneById(answer.question_id);
        return question!;
    }

}
