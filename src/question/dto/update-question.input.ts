import { CreateQuestionInput } from './create-question.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateQuestionInput {
  @Field(() => String, { nullable: true })
  question_item: string;

  @Field(() => Int, { nullable: true })
  question_number: number;

  @Field({ nullable: true })
  survey_id: string;

}
