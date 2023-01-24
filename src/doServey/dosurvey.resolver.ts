import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { DoSurveyService } from "./dosurvey.service";
import { CreateDoSurveyInput } from "./dto/create-doservey.input";
import { DoSurvey } from "./entity/doServey.entity";

@Resolver(of => DoSurvey)
export class DoSurveyResolver {
    constructor(private readonly doSurveyService: DoSurveyService) { }

    @Mutation(returns => DoSurvey)
    createDoSurvey(@Args('data') data: CreateDoSurveyInput) {
        return this.doSurveyService.create(data);
    }
}