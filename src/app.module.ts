import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { LoggerModule } from './common/log/logger.module';
import { DatabaseModule } from './database/database.module';
import { DoSurveyModule } from './doServey/dosurvey.module';
import { SurveysModule } from './surveys/surveys.module';



@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
    SurveyModule,
    QuestionModule,
    AnswerModule,
    LoggerModule,
    DatabaseModule,
    DoSurveyModule,
    SurveysModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {

}
