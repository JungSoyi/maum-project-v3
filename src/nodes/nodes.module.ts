import { Module } from "@nestjs/common";
import { AnswerModule } from "src/answer/answer.module";
import { answerProviders } from "src/answer/answer.providers";
import { AnswerService } from "src/answer/answer.service";
import { DatabaseModule } from "src/database/database.module";
import { QuestionModule } from "src/question/question.module";
import { questionProviders } from "src/question/question.providers";
import { QuestionService } from "src/question/question.service";
import { NodesResolvers } from "./nodes.resolvers";

@Module({
    imports: [AnswerModule, QuestionModule, DatabaseModule],
    providers: [NodesResolvers, AnswerService, QuestionService, ...answerProviders, ...questionProviders],
})
export class NodesModules { }