// import { Injectable } from '@nestjs/common'
// import { OrderedNestDataLoader } from 'nestjs-graphql-dataloader'
// import { Answer } from 'src/answer/entities/answer.entity' 
// import { AnswerService } from 'src/answer/answer.service' 

// @Injectable()
// export class LocationLoader extends OrderedNestDataLoader<Answer['answer_id'], Answer> {
//     constructor(private readonly answerService: AnswerService){
//         super()
//     }

//     protected getOptions = () => ({
//         query: (keys: Array<Answer['answer_id']>) => this.answerService.findByIds(keys),
//     })
// }