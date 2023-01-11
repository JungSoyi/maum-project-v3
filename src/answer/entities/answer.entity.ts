import { ObjectType, Field, Int, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Question } from 'src/question/entities/question.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';
import { toGlobalId } from 'graphql-relay';
import { Node } from '../../nodes/models/node.entity';


@ObjectType({ implements: Node })
@Entity()
export class Answer implements Node {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    answer_id: string;

    @Field(() => Int)
    @Column()
    answer_number: number

    @Field(() => String)
    @Column()
    answer_item: string;

    @Field(() => Int)
    @Column()
    answer_score: number;

    @CreateDateColumn()
    @Field(() => GraphQLISODateTime)
    readonly createdAt: Date;

    @UpdateDateColumn()
    @Field(() => GraphQLISODateTime)
    readonly updatedAt: Date;

    @Field(() => Question)
    @ManyToOne(() => Question, (question) => question.answers)
    @JoinColumn({ name: "question_id" })
    question: Question

    @RelationId((answer: Answer) => answer.question)
    question_id: string;

    @Field(() => ID, { name: 'id' })
    get relayId(): string {
        return toGlobalId('Answer', this.answer_id);
    }

}
