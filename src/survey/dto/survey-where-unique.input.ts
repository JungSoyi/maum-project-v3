import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class SurveyWhereUniqueInput {
    @Field(() => ID)
    id: string;
}