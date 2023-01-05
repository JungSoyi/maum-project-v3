import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SurveyModule } from './survey/survey.module';
import { join } from 'path';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'maum3',
      entities: [],
      synchronize: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    SurveyModule,
    QuestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
