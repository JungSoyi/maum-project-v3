import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSurveyInput {
  @Field(() => Int, { nullable: true })
  survey_number?: number;
}
