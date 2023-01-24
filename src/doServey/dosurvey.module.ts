import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/common/log/logger.module';
import { InputValidationError } from 'src/common/input-validator-error';
import { doSurveyProviders } from './dosurvey.providers';
import { DoSurveyService } from './dosurvey.service';
import { DoSurveyResolver } from './dosurvey.resolver';

@Module({
  imports: [LoggerModule],
  providers: [DoSurveyResolver, DoSurveyService, ...doSurveyProviders, InputValidationError],
})
export class DoSurveyModule { }
