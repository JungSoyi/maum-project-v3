import { ObjectType, Field, Int, ID, } from '@nestjs/graphql';
import { Answer } from 'src/answer/entities/answer.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { toGlobalId } from 'graphql-relay';
import { Node } from 'src/nodes/models/node.entity';

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
  // @JoinColumn({ name: "answer_id" })
  answers: Answer[];

  @Field(() => ID, { name: 'id' })
  get relayId(): string {
    return toGlobalId('Question', this.id);
  }
}
