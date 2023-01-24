import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateDoSurveyInput {
    @Field(() => String)
    doSurvey_name: string;
}