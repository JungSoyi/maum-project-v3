import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class QuestionWhereUniqueInput {
    @Field(() => ID)
    id: string;
}