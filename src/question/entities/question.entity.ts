import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Answer } from 'src/answer/entities/answer.entity';
import { Generated } from 'typeorm';

@ObjectType()
export class Question {
  @Field(() => ID)
  @Generated('increment')
  question_id: number;

  @Field(() => String)
  question_item: string;

  @Field(() => [Answer])
  answers: Answer[];
}
