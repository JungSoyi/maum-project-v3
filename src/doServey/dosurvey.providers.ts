import { DataSource } from "typeorm";
import { DoSurvey } from "./entity/doServey.entity";

export const doSurveyProviders = [
    {
        provide: 'DOSURVEY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(DoSurvey),
        inject: ['DATA_SOURCE'],
    }
]