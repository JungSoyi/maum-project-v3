import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuestionInput {
  @Field(() => String)
  question_item: string;

  @Field(() => Int)
  question_number: number;

  @Field()
  survey_id: string;

}
