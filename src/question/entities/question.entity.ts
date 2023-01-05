import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Answer } from 'src/answer/entities/answer.entity';

@ObjectType()
export class Question {
  @Field(() => Int)
  question_id: number;

  @Field(() => String)
  question_item: string;

  @Field(() => [Answer])
  answers: Answer[];
}
