import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Question } from 'src/question/entities/question.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Node } from 'src/nodes/models/node.entity';

@ObjectType({ implements: Node })
@Entity()
export class Survey {

  @Field(() => Int)
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Field(() => String)
  survey_title: string;

  @Field(() => Int)
  @Column({ nullable: true })
  survey_number: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field(() => [Question], { nullable: true })
  @OneToMany(() => Question, (question) => question.survey, { eager: true })
  questions: Question[];

}
