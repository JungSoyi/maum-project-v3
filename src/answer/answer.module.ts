import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { answerProviders } from './answer.providers';
import { QuestionModule } from 'src/question/question.module';

@Module({
    imports: [DatabaseModule],
    providers: [AnswerResolver, AnswerService, ...answerProviders]
})
export class AnswerModule { }
