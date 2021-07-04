import { InputType, ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, ManyToOne, RelationId } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { IsString, IsNumber, Length } from 'class-validator';
import { Restaurant } from './restaurant.entity';

@InputType('DishInputType', { isAbstract: true })
@ObjectType()
export class DishOptions {
  @Field(() => String)
  name: string;

  @Field(() => [String], { nullable: true })
  choices?: string[];

  @Field(() => Int, { nullable: true })
  extra?: number;
}

@InputType('DishInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Dish extends CoreEntity {
  @Field()
  @Column()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsString()
  photo?: string;

  @Field(() => Int)
  @Column()
  @IsNumber()
  price: number;

  @Field()
  @Column()
  @Length(5, 120)
  description: string;

  @Field(() => [DishOptions], { nullable: true })
  @Column({ type: 'json', nullable: true })
  options?: DishOptions[];

  @Field(() => [Restaurant])
  @ManyToOne(() => Restaurant, (restaurant: Restaurant) => restaurant.menu, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  restaurant: Restaurant;

  @RelationId((dish: Dish) => dish.restaurant)
  restaurantId: number;
}