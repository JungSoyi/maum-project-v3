import { DataSource } from "typeorm";
import { Surveys } from "./entity/surveys.entity";

export const surveysProviders = [
    {
        provide: 'SURVEYS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Surveys),
        inject: ['DATA_SOURCE'],
    }
]