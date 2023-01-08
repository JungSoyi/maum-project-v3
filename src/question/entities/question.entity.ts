import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Answer } from 'src/answer/entities/answer.entity';
import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';

@ObjectType()
@Entity()
export class Question {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  question_id: number;

  @Field(() => String)
  @Column()
  question_item: string;

  @Field(() => Answer)
  @OneToMany(() => Answer, (answer) => answer.answer_id)
  answers: Answer[];
}
