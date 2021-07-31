/* eslint-disable import/no-cycle */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { IItem, EmotionType, RecommendType } from '../constant';
import Restaurant from './restaurant.entity';

@Entity()
class Item {
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
  public price: string;

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

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.items, { cascade: true })
  public restaurant: Restaurant;

  getInfo(): IItem {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      emotion: this.emotion,
      recommend: this.recommend,
    };
  }

  static fillInfo({
    id,
    name,
    price,
    emotion,
    recommend,
  }: IItem) {
    const item = new Item();
    if (id && id !== item.id) item.id = id;
    if (name) item.name = name;
    if (price) item.price = price;
    if (emotion) item.emotion = emotion;
    if (recommend) item.recommend = recommend;
    return item;
  }
}

export default Item;
