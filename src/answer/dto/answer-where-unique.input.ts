import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class AnswerWhereUniqueInput {
    @Field(() => ID)
    id: string;
}