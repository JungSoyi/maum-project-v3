import { ObjectType, Field, Int, GraphQLISODateTime } from "@nestjs/graphql";
import { DoSurvey } from "src/doServey/entity/doServey.entity";
import { Question } from "src/question/entities/question.entity";
import { Survey } from "src/survey/entities/survey.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, Index, Unique } from "typeorm";

@ObjectType()
@Entity()
@Index('SurveyId', ['surveyId'], {})
@Unique(['surveyId', 'doSurveyId'])
export class Surveys {
    @Field(() => Int)
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => Survey, (survey) => survey.surveys)
    survey: Survey;

    @Field(() => Int)
    @Column({ nullable: true })
    surveyId: number;

    @ManyToOne(() => DoSurvey, (doSurvey) => doSurvey.surveys)
    doSurvey: DoSurvey;

    @Field(() => Int)
    @Column({ nullable: true })
    doSurveyId: number

}
