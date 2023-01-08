import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Question } from 'src/question/entities/question.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Answer {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    answer_id: number;

    @Field(() => String)
    answer_item: string;

    @Field(() => Int)
    answer_score: number;

    @ManyToOne(() => Question, (question) => question.answers)
    question: Question
}
