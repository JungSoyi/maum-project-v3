import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field(() => Int)
  answer_number: number;

  @Field(() => String)
  answer_item: string;

  @Field(() => Int)
  answer_score: number;

  @Field(() => String)
  question_id: string;
}
