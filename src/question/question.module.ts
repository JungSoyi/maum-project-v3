import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { questionProviders } from './question.providers';
import { LoggerModule } from 'src/common/log/logger.module';


@Module({
  imports: [LoggerModule],
  providers: [QuestionResolver, QuestionService, ...questionProviders],
})
export class QuestionModule { }
