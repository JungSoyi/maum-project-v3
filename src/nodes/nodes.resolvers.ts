import { Query } from "@nestjs/graphql";
import { Args, ID, Resolver } from "@nestjs/graphql";
import { fromGlobalId } from "graphql-relay";
import { AnswerService } from "src/answer/answer.service";
import { QuestionService } from "src/question/question.service";
import { Node } from "./models/node.entity";
import { SurveyService } from "src/survey/survey.service";


@Resolver()
export class NodesResolvers {
    constructor(
        private readonly answerService: AnswerService,
        private readonly questionService: QuestionService,
        private readonly surveyService: SurveyService
    ) { }

    @Query((_returns) => Node, { nullable: true })
    async node(
        @Args({ name: 'id', type: () => ID }) id: string,
    ): Promise<Node | undefined | null> {
        const resolvedGlobalId = fromGlobalId(id);
        if (!resolvedGlobalId.id) {
            return null;
        }
        switch (resolvedGlobalId.type) {
            // case 'Answer':
            //     return await this.answerService.findOneById(resolvedGlobalId.id);
            // case 'Question':
            //     return await this.questionService.findOneById(resolvedGlobalId.id);
            // case 'Survey':
            //     return await this.surveyService.findOneById(resolvedGlobalId.id);
            default:
                break;
        }
        return null;
    }
}