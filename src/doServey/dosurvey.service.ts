import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { DoSurvey } from "./entity/doServey.entity";

@Injectable()
export class DoSurveyService {
    constructor(
        @Inject('DOSURVEY_REPOSITORY')
        private doServeyRepository: Repository<DoSurvey>
    ) { }
}