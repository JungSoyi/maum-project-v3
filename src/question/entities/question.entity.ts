import { ObjectType, Field, Int, } from '@nestjs/graphql';
import { Answer } from 'src/answer/entities/answer.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, } from 'typeorm';

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

  @Field(() => [Answer], { nullable: true })
  @OneToMany(() => Answer, (answer) => answer.question, { cascade: true })
  @JoinColumn({ name: "answer_id" })
  answers?: Answer[];
}
