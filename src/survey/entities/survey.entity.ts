import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Question } from 'src/question/entities/question.entity';
import { CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from 'typeorm';
/**
 * survey_id : number
 * created_at : LocalDateTime
 * updated_at : LocalDateTime
 * total_score : number
 */
@ObjectType({ implements: Node })
@Entity()
export class Survey implements Node {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  survey_number: number;

  @Field(() => Int)
  total_score: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field(() => [Question], { nullable: true })
  @OneToMany(() => Question, (question) => question.survey, { eager: true })
  questions: Question[];
}
