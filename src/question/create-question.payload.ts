import { Field, ObjectType } from "@nestjs/graphql";
import { QuestionEdge } from "./connection-types";

@ObjectType()
export class CreateQuestionPayload {
    @Field(() => QuestionEdge)
    questionEdge: QuestionEdge;
}