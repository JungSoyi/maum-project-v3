import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateSurveysInput {
    @Field(() => Int)
    doSurveyId: number;

    @Field(() => Int)
    surveyId: number;
}