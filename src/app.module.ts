import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SurveyModule } from './survey/survey.module';
import { join } from 'path';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    SurveyModule,
    QuestionModule,
    AnswerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
