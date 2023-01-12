import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSurveyInput {
  @Field(() => Int)
  survey_number: number;

}
