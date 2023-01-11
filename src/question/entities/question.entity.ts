import { ObjectType, Field, Int, ID, } from '@nestjs/graphql';
import { Answer } from 'src/answer/entities/answer.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { toGlobalId } from 'graphql-relay';

@ObjectType()
@Entity()
export class Question {

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  question_id: string;

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
  @OneToMany(() => Answer, (answer) => answer.question, { cascade: true })
  @JoinColumn({ name: "answer_id" })
  answers?: Answer[];
  answer_id: number;

  @Field(() => ID, { name: 'id' })
  get relayId(): string {
    return toGlobalId('Question', this.question_id);
  }
}
