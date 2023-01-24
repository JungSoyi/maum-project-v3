import { Module } from '@nestjs/common';
import { QuestionService } from 'src/question/question.service';
import { questionProviders } from 'src/question/question.providers';
import { LoggerModule } from 'src/common/log/logger.module';
import { InputValidationError } from 'src/common/input-validator-error';
import { doSurveyProviders } from './dosurvey.providers';
import { DoSurveyService } from './dosurvey.service';

@Module({
  imports: [LoggerModule],
  providers: [DoSurveyService, ...doSurveyProviders, InputValidationError],
})
export class DoSurveyModule { }
