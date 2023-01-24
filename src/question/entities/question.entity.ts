import { ObjectType, Field, Int, ID, } from '@nestjs/graphql';
import { Answer } from 'src/answer/entities/answer.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn, } from 'typeorm';
import { toGlobalId } from 'graphql-relay';
import { Node } from 'src/nodes/models/node.entity';
import { Survey } from 'src/survey/entities/survey.entity';

@ObjectType({ implements: Node })
@Entity()
export class Question {

  @Field(() => Int)
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Field(() => Int)
  @Column()
  question_number: number

  @Field(() => String)
  @Column()
  question_item: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field(() => [Answer], { nullable: true })
  @OneToMany(() => Answer, (answer) => answer.question, { eager: true })
  answers: Answer[];

  @Field(() => Survey)
  @ManyToOne(() => Survey, (survey) => survey.questions)
  survey: Survey

  @RelationId((question: Question) => question.survey)
  surveyId: string;
}
