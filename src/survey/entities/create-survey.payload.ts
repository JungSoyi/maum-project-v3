import { Field, ObjectType } from "@nestjs/graphql";
import { SurveyEdge } from "../connection-type";

@ObjectType()
export class CreateSurveyPayload {

    @Field(() => SurveyEdge)
    surveyEdge: SurveyEdge;
}