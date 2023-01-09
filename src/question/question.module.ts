import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { DataSource } from 'typeorm';
import { Question } from './entities/question.entity';
import { DatabaseModule } from 'src/database/database.module';
import { questionProviders } from './question.providers';
import { AnswerService } from 'src/answer/answer.service';
import { AnswerModule } from 'src/answer/answer.module';
import { answerProviders } from 'src/answer/answer.providers';
import { AnswerResolver } from 'src/answer/answer.resolver';

@Module({
  imports: [DatabaseModule, AnswerModule],
  providers: [QuestionResolver, QuestionService, AnswerService, AnswerResolver, ...questionProviders, ...answerProviders],
})
export class QuestionModule { }
