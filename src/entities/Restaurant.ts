import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
  })
  name: string;

  @Column({
    length: 255,
  })
  location: string;

  @Column({
    length: 255,
  })
  phone: string;
}

export default Restaurant;
