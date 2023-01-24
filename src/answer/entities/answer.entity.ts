import { ObjectType, Field, Int, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Question } from 'src/question/entities/question.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Answer {
    @Field(() => Int)
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field(() => Int)
    @Column()
    answer_number: number

    @Field(() => String)
    @Column()
    answer_item: string;

    @Field(() => Int)
    @Column()
    answer_score: number;

    @Field(() => Boolean, { defaultValue: false })
    @Column({ nullable: true }) //db초기화 후 nullable 삭제
    answer_status: boolean;

    @CreateDateColumn()
    @Field(() => GraphQLISODateTime)
    readonly createdAt: Date;

    @UpdateDateColumn()
    @Field(() => GraphQLISODateTime)
    readonly updatedAt: Date;

    @Field(() => Question)
    @ManyToOne(() => Question, (question) => question.answers)
    question: Question

    @RelationId((answer: Answer) => answer.question)
    question_id: string;


}
