import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Surveys } from "src/surveys/entity/surveys.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
/**
 * Survey로 만든 개별 설문지
 */
@ObjectType()
@Entity()
export class DoSurvey {
    @Field(() => Int)
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Field(() => String)
    @Column()
    doSurvey_name: string;


    @OneToMany(() => Surveys, (surveys) => surveys.doSurvey, { eager: true })
    surveys: Surveys;

}