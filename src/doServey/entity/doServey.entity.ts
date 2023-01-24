import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Surveys } from "src/surveys/entity/surveys.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class DoServey {
    @Field(() => Int)
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Field(() => String)
    @Column()
    doServey_name: string;

    @Field()
    @OneToMany(() => Surveys, (surveys) => surveys.doServey)
    surveys: Surveys;

}