import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyResolver } from './survey.resolver';
import { surveyProviders } from './survey.providers';
import { DatabaseModule } from 'src/database/database.module';
import { QuestionService } from 'src/question/question.service';
import { questionProviders } from 'src/question/question.providers';
import { LoggerModule } from 'src/common/logger.module';

@Module({
  imports: [DatabaseModule, LoggerModule],
  providers: [SurveyResolver, SurveyService, ...surveyProviders, QuestionService, ...questionProviders],
})
export class SurveyModule { }
