import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Answer {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  answer_id: number;

  @Field(() => String)
  answer_item: string;

  @Field(() => Int)
  answer_score: number;
}
