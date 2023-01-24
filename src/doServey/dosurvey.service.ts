import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateDoSurveyInput } from "./dto/create-doservey.input";
import { DoSurvey } from "./entity/doServey.entity";

@Injectable()
export class DoSurveyService {
    constructor(
        @Inject('DOSURVEY_REPOSITORY')
        private doServeyRepository: Repository<DoSurvey>
    ) { }

    create(data: CreateDoSurveyInput) {
        const doSurvey = this.doServeyRepository.create(data);
        return this.doServeyRepository.save(doSurvey);
    }
}