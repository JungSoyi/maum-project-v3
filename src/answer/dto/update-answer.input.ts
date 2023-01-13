import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAnswerInput {
  @Field(() => Int, { nullable: true })
  answer_number: number;

  @Field(() => String, { nullable: true })
  answer_item: string;

  @Field(() => Int, { nullable: true })
  answer_score: number;

  @Field({ nullable: true })
  question_id: string;

  @Field({ nullable: true })
  answer_status: boolean;

}
