import { ObjectType } from "@nestjs/graphql";
import { EdgeType } from "src/common/connection-paging";
import { Question } from "./entities/question.entity";

@ObjectType()
export class QuestionEdge extends EdgeType(Question) { }