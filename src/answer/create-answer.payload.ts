import { Field, ObjectType } from "@nestjs/graphql";
import { AnswerEdge } from "./connection-types";

@ObjectType()
export class CreateAnswerPayload {
    @Field((_type) => AnswerEdge)
    answerEdge: AnswerEdge;
}