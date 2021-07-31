/* eslint-disable import/no-cycle */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { IRestaurant, EmotionType, RecommendType } from '../constant';
import Item from './item.entity';

@Entity()
class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  public name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  public location: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  public phone: string;

  // TODO: Change column type to string for enums after learning migrations
  @Column({
    type: 'text',
    default: EmotionType.Question,
  })
  public emotion: EmotionType;

  @Column({
    type: 'text',
    default: RecommendType.Question,
  })
  public recommend: RecommendType;

  @OneToMany(() => Item, (item) => item.restaurant)
  items: Item[];

  getInfo(): IRestaurant {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      phone: this.phone,
      emotion: this.emotion,
      recommend: this.recommend,
    };
  }

  static fillInfo({
    id,
    name,
    location,
    phone,
    emotion,
    recommend,
  }: IRestaurant) {
    const rest = new Restaurant();
    if (id && id !== rest.id) rest.id = id;
    if (name) rest.name = name;
    if (location) rest.location = location;
    if (phone) rest.phone = phone;
    if (emotion) rest.emotion = emotion;
    if (recommend) rest.recommend = recommend;
    return rest;
  }
}

export default Restaurant;
