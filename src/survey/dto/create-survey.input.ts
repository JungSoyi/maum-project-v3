import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSurveyInput {


  @Field(() => String)
  survey_title: string;

}
