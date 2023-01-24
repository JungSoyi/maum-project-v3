import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateSurveysInput } from "./dto/create-surveys.input";
import { Surveys } from "./entity/surveys.entity";

@Injectable()
export class SurveysService {
    constructor(
        @Inject('SURVEYS_REPOSITORY')
        private surveysRepository: Repository<Surveys>
    ) { }

    async create(data: CreateSurveysInput) {
        const surveys = this.surveysRepository.create(data);
        return this.surveysRepository.save(surveys);
    }
}