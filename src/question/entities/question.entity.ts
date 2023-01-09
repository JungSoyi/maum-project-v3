import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Answer } from 'src/answer/entities/answer.entity';
import { Column, Entity, Generated, JoinColumn, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';

@ObjectType()
@Entity()
export class Question {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  question_id: number;

  @Field(() => Int)
  @Column()
  question_number: number

  @Field(() => String)
  @Column()
  question_item: string;

  @Field(() => [Answer])
  @OneToMany(() => Answer, (answer) => answer.answer_id, { cascade: true })
  @JoinColumn({ name: "answer_id" })
  answers: Answer[];
}
