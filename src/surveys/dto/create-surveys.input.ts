import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateSurveysInput {
    @Field(() => Int)
    doSurvey_id: number;

    @Field(() => Int)
    survey_id: number;
}