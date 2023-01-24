import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSurveyInput {

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  survey_number?: number;
}
