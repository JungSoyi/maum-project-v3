import { ObjectType, Field, Int, GraphQLISODateTime } from "@nestjs/graphql";
import { DoServey } from "src/doServey/entity/doServey.entity";
import { Question } from "src/question/entities/question.entity";
import { Survey } from "src/survey/entities/survey.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";

@ObjectType()
@Entity()
export class Surveys {
    @Field(() => Int)
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Field(() => Int)
    @Column()
    survey_id: number;

    @Field(() => Survey, { nullable: true })
    @ManyToOne(() => Survey, (survey) => survey.surveys)
    survey: Survey;

    @Field(() => DoServey)
    @ManyToOne(() => DoServey, (doServey) => doServey.surveys)
    doServey: DoServey;
}
