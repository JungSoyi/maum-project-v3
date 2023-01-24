import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CreateSurveysInput } from "./dto/create-surveys.input";
import { Surveys } from "./entity/surveys.entity";
import { SurveysService } from "./surveys.service";

@Resolver(of => Surveys)
export class SurveysResolver {
    constructor(private readonly surveysService: SurveysService) { }

    @Mutation(returns => Surveys)
    createSurveys(
        @Args('data') data: CreateSurveysInput
    ) {
        return this.surveysService.create(data);
    }
}