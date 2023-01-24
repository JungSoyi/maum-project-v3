import { InputType, Int, Field } from '@nestjs/graphql';
import { Question } from 'src/question/entities/question.entity';

@InputType()
export class CreateSurveyInput {


  @Field(() => String)
  survey_title: string;

}
