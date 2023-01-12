import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateScoreInput {
    @Field(() => Int)
    pick_answer: number

    @Field(() => Int)
    pick_answer_score: number

}
