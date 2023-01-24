import { InputType, Int, Field } from '@nestjs/graphql';
import { Question } from 'src/question/entities/question.entity';

@InputType()
export class CreateSurveyInput {
  @Field(() => Int)
  survey_number: number;

  @Field(() => String)
  survey_title: string;

}
