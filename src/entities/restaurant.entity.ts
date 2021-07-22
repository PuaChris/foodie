import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { EmotionType, IRestaurant, RecommendType } from '../constant';

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
    type: 'enum',
    enum: EmotionType,
    default: EmotionType.Surprise,
  })
  public emotion: EmotionType;

  @Column({
    type: 'enum',
    enum: RecommendType,
    default: RecommendType.Question,
  })
  public recommend: RecommendType;

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
