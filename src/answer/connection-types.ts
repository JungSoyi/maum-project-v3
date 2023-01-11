import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ConnectionType, EdgeType } from "src/common/connection-paging";
import { Answer } from "./entities/answer.entity";

@ObjectType()
export class AnswerEdge extends EdgeType(Answer) { }

@ObjectType()
class AggregateAnswer {
    @Field(() => Number)
    count: number;
}

@ObjectType()
export class AnswerConnection extends ConnectionType(Answer, AnswerEdge) {
    @Field(() => AggregateAnswer)
    aggregate: AggregateAnswer;
}