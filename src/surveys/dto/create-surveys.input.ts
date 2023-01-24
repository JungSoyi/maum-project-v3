import { Field, Int } from "@nestjs/graphql";

export class SurveysInput {
    @Field(() => Int)
    doSurvey_id: number;

    @Field(() => Int)
    survey_id: number;
}