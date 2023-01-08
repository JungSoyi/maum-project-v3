import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { DataSource } from 'typeorm';
import { Question } from './entities/question.entity';
import { DatabaseModule } from 'src/database/database.module';
import { questionProviders } from './question.providers';

@Module({
  imports: [DatabaseModule],
  providers: [QuestionResolver, QuestionService, ...questionProviders],
})
export class QuestionModule { }
