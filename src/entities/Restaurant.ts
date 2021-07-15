import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { EmotionType, RecommendType } from '../constant';

@Entity()
class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: EmotionType,
    default: EmotionType.Surprise,
  })
  emotion: EmotionType;

  @Column({
    type: 'enum',
    enum: RecommendType,
    default: RecommendType.Question,
  })
  recommend: RecommendType;
}

export default Restaurant;
