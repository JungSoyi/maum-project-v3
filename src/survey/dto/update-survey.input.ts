import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSurveyInput {

  @Field(() => String, { nullable: true })
  survey_title?: string;

}
