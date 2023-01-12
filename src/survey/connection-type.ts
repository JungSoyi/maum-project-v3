import { ObjectType } from "@nestjs/graphql";
import { EdgeType } from "src/common/connection-paging";
import { Survey } from "./entities/survey.entity";

@ObjectType()
export class SurveyEdge extends EdgeType(Survey) { }