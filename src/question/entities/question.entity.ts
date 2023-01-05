import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Question {
  @Field(() => Int)
  question_id: number;

  @Field(() => String)
  question_item: string;
}
