import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Question } from 'src/question/entities/question.entity';
import { Surveys } from 'src/surveys/entity/surveys.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Survey {

  @Field(() => Int)
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Field(() => String)
  @Column()
  survey_title: string;


  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  readonly createdAt: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  readonly updatedAt: Date;

  @Field(() => [Question], { nullable: true })
  @OneToMany(() => Question, (question) => question.survey, { eager: true })
  questions: Question[];

  @Field(() => [Survey])
  @OneToMany(() => Surveys, (surveys) => surveys.survey)
  surveys: Surveys[];

}
