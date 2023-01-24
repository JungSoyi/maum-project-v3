import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateDoSurveyInput } from "./dto/create-dosurvey.input";
import { DoSurvey } from "./entity/doServey.entity";

@Injectable()
export class DoSurveyService {
    constructor(
        @Inject('DOSURVEY_REPOSITORY')
        private doSurveyRepository: Repository<DoSurvey>
    ) { }

    async create(data: CreateDoSurveyInput) {
        const doSurvey = this.doSurveyRepository.create(data);
        return this.doSurveyRepository.save(doSurvey);
    }
}