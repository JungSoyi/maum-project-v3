import { InputType, Int, Field } from '@nestjs/graphql';
import { Answer } from 'src/answer/entities/answer.entity';

@InputType()
export class CreateQuestionInput {
  @Field(() => String)
  question_item: string;

  @Field(() => Int)
  question_number: number;
}
