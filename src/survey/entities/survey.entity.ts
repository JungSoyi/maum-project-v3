import { ObjectType, Field, Int } from '@nestjs/graphql';
/**
 * survey_id : number
 * created_at : LocalDateTime
 * updated_at : LocalDateTime
 * total_score : number
 */
@ObjectType()
export class Survey {
  @Field(() => Int, { description: 'survey id' })
  survey_id: number;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Int)
  total_score: number;
}
