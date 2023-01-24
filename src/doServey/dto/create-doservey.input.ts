import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateDoSurveyInput {
    @Field(() => String)
    doServey_name: string;
}