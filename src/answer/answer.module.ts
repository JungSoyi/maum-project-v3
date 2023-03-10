import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { answerProviders } from './answer.providers';
import { QuestionModule } from 'src/question/question.module';
import { QuestionService } from 'src/question/question.service';
import { questionProviders } from 'src/question/question.providers';
import { LoggerModule } from 'src/common/log/logger.module';

@Module({
    imports: [DatabaseModule, QuestionModule, LoggerModule],
    providers: [AnswerResolver, AnswerService, ...answerProviders, QuestionService, ...questionProviders]
})
export class AnswerModule { }
