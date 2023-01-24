import { Resolver } from "@nestjs/graphql";
import { DoSurvey } from "./entity/doServey.entity";

@Resolver(of => DoSurvey)
export class DoSurveyResolver {

}