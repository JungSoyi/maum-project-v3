import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NodesModules } from './nodes/nodes.module';
import { LoggerModule } from './common/log/logger.module';



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
    NodesModules,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
    // AppService,
    // {
    //   // provide: APP_INTERCEPTOR,
    //   // useClass: DataLoaderInterceptor,
    // }
  ],
})
export class AppModule {

}
