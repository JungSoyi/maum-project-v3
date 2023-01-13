import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Question } from 'src/question/entities/question.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Node } from 'src/nodes/models/node.entity';
import { toGlobalId } from 'graphql-relay';

@ObjectType({ implements: Node })
@Entity()
export class Survey implements Node {

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column({ nullable: true })
  survey_number: number;

  @Field(() => Int)
  @Column({ nullable: true })
  total_score: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field(() => [Question], { nullable: true })
  @OneToMany(() => Question, (question) => question.survey, { eager: true })
  questions: Question[];

  @Field(() => ID, { name: 'id' })
  get relayId(): string {
    return toGlobalId('Survey', this.id);
  }
}
