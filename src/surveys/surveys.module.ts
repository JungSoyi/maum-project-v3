import { Module } from "@nestjs/common";
import { LoggerModule } from "src/common/log/logger.module";
import { surveysProviders } from "./surveys.providers";
import { SurveysResolver } from "./surveys.resolver";
import { SurveysService } from "./surveys.service";

@Module({
    imports: [LoggerModule],
    providers: [SurveysResolver, SurveysService, ...surveysProviders],
})
export class SurveysModule { }