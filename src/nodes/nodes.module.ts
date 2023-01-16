import { Module } from "@nestjs/common";
import { AnswerModule } from "src/answer/answer.module";
import { answerProviders } from "src/answer/answer.providers";
import { AnswerService } from "src/answer/answer.service";
import { InputValidationError } from "src/common/input-validator-error";
import { DatabaseModule } from "src/database/database.module";
import { QuestionModule } from "src/question/question.module";
import { questionProviders } from "src/question/question.providers";
import { QuestionService } from "src/question/question.service";
import { SurveyModule } from "src/survey/survey.module";
import { surveyProviders } from "src/survey/survey.providers";
import { SurveyService } from "src/survey/survey.service";
import { NodesResolvers } from "./nodes.resolvers";

@Module({
    imports: [AnswerModule, QuestionModule, SurveyModule],
    providers: [NodesResolvers, AnswerService, QuestionService, SurveyService, ...answerProviders, ...questionProviders, ...surveyProviders, InputValidationError],
})
export class NodesModules { }