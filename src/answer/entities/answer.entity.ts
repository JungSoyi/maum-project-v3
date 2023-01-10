import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Question } from 'src/question/entities/question.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Answer {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    answer_id: number;

    @Field(() => Int)
    @Column()
    answer_number: number

    @Field(() => String)
    @Column()
    answer_item: string;

    @Field(() => Int)
    @Column()
    answer_score: number;

    @ManyToOne(() => Question, (question) => question.answers)
    @JoinColumn({ name: "question_id" })
    question: Question

}
