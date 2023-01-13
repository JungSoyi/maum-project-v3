import { Field, ObjectType } from "@nestjs/graphql";
import { AnswerEdge } from "./connection-types";

@ObjectType()
export class CreateAnswerPayload {
    @Field(() => AnswerEdge)
    answerEdge: AnswerEdge;
}