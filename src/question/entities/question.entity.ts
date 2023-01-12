import { ObjectType, Field, Int, ID, } from '@nestjs/graphql';
import { Answer } from 'src/answer/entities/answer.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { toGlobalId } from 'graphql-relay';
import { Node } from 'src/nodes/models/node.entity';
import { Survey } from 'src/survey/entities/survey.entity';

@ObjectType({ implements: Node })
@Entity()
export class Question implements Node {

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column()
  question_number: number

  @Field(() => String)
  @Column()
  question_item: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field(() => [Answer], { nullable: true })
  @OneToMany(() => Answer, (answer) => answer.question, { eager: true })
  answers: Answer[];

  @Field(() => Survey)
  @ManyToOne(() => Survey, (survey) => survey.questions)
  survey: Survey

  @Field(() => ID, { name: 'id' })
  get relayId(): string {
    return toGlobalId('Question', this.id);
  }
}
